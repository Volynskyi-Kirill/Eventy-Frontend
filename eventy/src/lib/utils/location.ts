interface Location {
  id?: number;
  name: string;
}

interface LocationData {
  country?: Location | null;
  state?: Location | null;
  city?: Location | null;
}

export const extractLocationNames = (data: LocationData) => {
  return {
    country: data.country?.name as string,
    state: data.state?.name as string,
    city: data.city?.name as string,
  };
};
