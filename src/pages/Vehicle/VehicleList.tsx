import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Truck,
  Plus,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Eye,
  Edit,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getVehicles } from '@/services/vehicleService';
import AddVehicle from './AddVehicle';
import { VehicleTableSkeleton } from '@/components/Skeleton';

const PAGE_SIZE = 10;

export default function VehicleDirectory() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    id?: string | number;
  }>({
    isOpen: false,
    mode: 'add'
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;
  const startIndex = totalCount > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = totalCount > 0 ? Math.min(currentPage * PAGE_SIZE, totalCount) : 0;
  const showPagination = !isLoading && totalCount > 0 && vehicles.length > 0;

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Status filter state: 'all' | 'available' | 'notAvailable'
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'notAvailable'>('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(e.target as Node)) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // reset to page 1 on new search
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchTerm]);

  const fetchVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
        search: debouncedSearch || undefined,
        isAvailable:
          statusFilter === 'available'
            ? true
            : statusFilter === 'notAvailable'
              ? false
              : undefined,
      };

      const res = await getVehicles(params);
      
      // ✅ Extract from API structure (assuming same as driver for consistency)
      const rawList = res?.data?.data || res?.data || [];
      const total = res?.data?.totalRecords || res?.totalRecords || rawList.length;

      // ✅ MAP DATA
      const mappedVehicles = rawList.map((v: any) => ({
        id: v.vehicle_Id ?? v.Vehicle_Id,
        VehicleNumber: v.vehicleNumber || v.VehicleNumber,
        VehicleType: v.vehicleType || v.VehicleType,
        Brand: v.brand || v.Brand,
        Model: v.model || v.Model,
        IsAvailable: v.isAvailable ?? v.IsAvailable,
        IsActive: v.isActive ?? v.IsActive,
        CurrentLocation: v.currentLocation || v.CurrentLocation || 'Unknown',
        FuelType: v.fuelType || v.FuelType,
      }));

      setVehicles(mappedVehicles);
      setTotalCount(total);
    } catch (error) {
      console.error("❌ ERROR FETCHING VEHICLES:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Modal handlers
  const openModal = (mode: 'add' | 'edit' | 'view', id?: string | number) => {
    setModalState({ isOpen: true, mode, id });
  };

  const closeModal = (refresh?: boolean) => {
    setModalState({ isOpen: false, mode: 'add' });
    if (refresh) fetchVehicles();
  };

  const statusLabel = statusFilter === 'all' ? 'All Status' : statusFilter === 'available' ? 'Available' : 'Not Available';

  // Pagination helpers
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-on-surface">Vehicle Assets</h1>
          <p className="text-on-surface-variant mt-1 font-medium">Manage and monitor your fleet inventory.</p>
        </div>
        <button
          onClick={() => openModal('add')}
          className="btn-primary px-6 py-3"
        >
          <Plus size={18} />
          <span>Register Asset</span>
        </button>
      </section>

      <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
        <div className="p-6 bg-surface-container-lowest flex flex-col md:flex-row items-center justify-between gap-4 border-b border-outline/5">
          {/* Search Box */}
          <div className="relative w-full md:w-96 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search vehicles..."
              className="w-full pl-12 pr-10 py-3 bg-surface-container-low border-0 border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-t-lg transition-all text-sm"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container-high transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className={cn(
                  "flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  statusFilter !== 'all'
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                )}
              >
                <Filter size={16} className="mr-2" />
                {statusLabel}
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-lg ring-1 ring-outline/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    {[
                      { value: 'all' as const, label: 'All Status' },
                      { value: 'available' as const, label: 'Available' },
                      { value: 'notAvailable' as const, label: 'Not Available' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setCurrentPage(1);
                          setShowStatusDropdown(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 hover:bg-surface-container-low transition-colors",
                          statusFilter === option.value && "bg-primary/5"
                        )}
                      >
                        <p className={cn(
                          "text-sm font-semibold",
                          statusFilter === option.value ? "text-primary" : "text-on-surface"
                        )}>{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Vehicle</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Registration</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Type</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Location</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5">
              {isLoading ? (
                <VehicleTableSkeleton count={PAGE_SIZE} />
              ) : vehicles.length > 0 ? (
                vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                          <Truck size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface">{v.Brand} {v.Model}</p>
                          <p className="text-xs text-on-surface-variant">{v.FuelType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-primary bg-primary/5 px-2 py-1 rounded">{v.VehicleNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-on-surface">{v.VehicleType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-on-surface-variant" />
                        <p className="text-sm text-on-surface">{v.CurrentLocation}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset",
                        v.IsAvailable ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-amber-50 text-amber-700 ring-amber-600/20"
                      )}>
                        {v.IsAvailable ? 'Available' : 'On Trip'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/vehicles/${v.id}`)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => navigate(`/vehicles/${v.id}?edit=true`)}
                          className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <Truck size={48} />
                      <p className="text-sm font-black uppercase tracking-widest text-on-surface">No vehicles found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {showPagination && (
          <div className="px-6 py-5 bg-surface-container-low/30 border-t border-outline/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-widest">
                Showing <span className="text-on-surface font-bold text-sm">{startIndex}–{endIndex}</span> of <span className="text-on-surface font-bold text-sm">{totalCount}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  currentPage === 1 ? "text-on-surface-variant/30 cursor-not-allowed" : "text-on-surface-variant hover:bg-surface-container-highest hover:text-primary"
                )}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 px-2">
                {getPageNumbers().map((page, idx) =>
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-on-surface-variant font-bold">…</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={cn(
                        "min-w-[32px] h-8 px-2 rounded-lg text-xs font-bold transition-all",
                        currentPage === page ? "bg-primary text-white shadow-md" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      )}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  currentPage >= totalPages ? "text-on-surface-variant/30 cursor-not-allowed" : "text-on-surface-variant hover:bg-surface-container-highest hover:text-primary"
                )}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoading && !vehicles.length && (
        <div className="fixed inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <Loader2 size={40} className="animate-spin text-primary" />
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Syncing Live Data...</p>
          </div>
        </div>
      )}

      {/* Vehicle Form Modal */}
      {modalState.isOpen && (
        <AddVehicle
          mode={modalState.mode}
          id={modalState.id}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
