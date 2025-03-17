import { create } from "zustand";

interface ShippingAddressState {
  name: string;
  street: string;
  city: string;
  country: string;
  phone: string;
  setName: (name: string) => void;
  setStreet: (street: string) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
  setPhone: (phone: string) => void;
  clearAddress: () => void;
}

export const useShippingAddressStore = create<ShippingAddressState>((set) => ({
  name: "",
  street: "",
  city: "",
  country: "",
  phone: "",
  setName: (name: string) => set({ name }),
  setStreet: (street: string) => set({ street }),
  setCity: (city: string) => set({ city }),
  setCountry: (country: string) => set({ country }),
  setPhone: (phone: string) => set({ phone }),
  clearAddress: () =>
    set({ name: "", street: "", city: "", country: "", phone: "" }),
}));
