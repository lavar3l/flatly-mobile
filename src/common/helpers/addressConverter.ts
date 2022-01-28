import { FlatAddress } from "../types/Flat";

export function firstLine(address: FlatAddress) {
  return `${address.streetName} ${address.houseNumber} ${
    address.localNumber ? "/" + address.localNumber : ""
  }`;
}

export function secondLine(address: FlatAddress) {
  return `${address.postalCode} ${address.city}`;
}

export function full(address?: FlatAddress) {
  return address ? `${firstLine(address)} ${secondLine(address)}` : "";
}
