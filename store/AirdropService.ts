import axios from 'axios';
import {Airdrop} from '../types/airdrop';

async function getAidrop(url: string, map: (data: any) => any) {
  try {
    const response = await axios.get(url);
    return map(response.data);
  } catch (error) {
    console.error('Error fetching airdrop allocations:', error);
    // throw error;
  }
}

export async function getKaminoAirdrop2(wallet: string) {
  const url = `https://api.hubbleprotocol.io/v2/airdrop/users/${wallet}/allocations?source=Season1`;
  const airdrop = getAidrop(url, data => {
    return data.reduce((total, item) => {
      const quantity = parseFloat(item.quantity);
      if (!isNaN(quantity)) {
        return total + quantity;
      } else {
        return total;
      }
    }, 0);
  });

  try {
    const response = await axios.get(url);
    const total = response.data.reduce((total, item) => {
      const quantity = parseFloat(item.quantity);
      if (!isNaN(quantity)) {
        return total + quantity;
      } else {
        return total;
      }
    }, 0);
    return total;
  } catch (error) {
    console.error('Error fetching airdrop allocations:', error);
    throw error;
  }
}

export async function getKaminoAirdrop(wallet: string) {
  const url = `https://api.hubbleprotocol.io/v2/airdrop/users/${wallet}/allocations?source=Season1`;
  try {
    const response = await axios.get(url);
    const total = response.data.reduce((total, item) => {
      const quantity = parseFloat(item.quantity);
      if (!isNaN(quantity)) {
        return total + quantity;
      } else {
        return total;
      }
    }, 0);
    return total;
  } catch (error) {
    console.error('Error fetching airdrop allocations:', error);
    throw error;
  }
}

export async function getParclAirdrop(wallet: string) {
  const url = `https://app.parcl.co/api/allocation/${wallet}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching user points balance:', error);
    throw error;
  }
}

export async function getDriftAirdrop(wallet: string) {
  const url = `https://app.drift.trade/api/points-drop?authority=${wallet}&bust`;
  try {
    const response = await axios.get(url);
    return response.data.data.latestDrop.authorityScore;
  } catch (error) {
    console.error('Error fetching user points balance:', error);
    throw error;
  }
}
