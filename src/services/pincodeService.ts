import axios from 'axios';

// Pincode API service for auto-filling address fields
export interface PincodeData {
  pincode: string;
  city: string;
  state: string;
  country: string;
  district?: string;
  division?: string;
  region?: string;
}

// Fetch pincode data from Indian Postal API
export const fetchPincodeData = async (pincode: string): Promise<PincodeData | null> => {
  try {
    // Using a free Indian pincode API
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

    if (response.data && response.data[0] && response.data[0].Status === 'Success') {
      const postOffice = response.data[0].PostOffice[0];

      return {
        pincode: pincode,
        city: postOffice.District || postOffice.Name || '',
        state: postOffice.State || '',
        country: postOffice.Country || 'India',
        district: postOffice.District,
        division: postOffice.Division,
        region: postOffice.Region
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching pincode data:', error);
    return null;
  }
};

// Alternative API using postalpincode.in
export const fetchPincodeDataAlternative = async (pincode: string): Promise<PincodeData | null> => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

    if (response.data && response.data[0] && response.data[0].Status === 'Success') {
      const postOffice = response.data[0].PostOffice[0];

      return {
        pincode: pincode,
        city: postOffice.Name || postOffice.District || '',
        state: postOffice.State || '',
        country: 'India',
        district: postOffice.District,
        division: postOffice.Division,
        region: postOffice.Region
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching pincode data:', error);
    return null;
  }
};