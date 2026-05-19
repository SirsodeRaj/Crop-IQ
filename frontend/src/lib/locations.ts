export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface District {
  name: string;
  cities: City[];
}

export interface State {
  name: string;
  districts: District[];
}

export const INDIA_LOCATIONS: State[] = [
  {
    name: "Maharashtra",
    districts: [
      {
        name: "Pune",
        cities: [
          { name: "Pune City", lat: 18.5204, lon: 73.8567 },
          { name: "Baramati", lat: 18.1524, lon: 74.5779 },
          { name: "Shirur", lat: 18.8276, lon: 74.3776 }
        ]
      },
      {
        name: "Nashik",
        cities: [
          { name: "Nashik City", lat: 20.0110, lon: 73.7903 },
          { name: "Malegaon", lat: 20.5524, lon: 74.5262 },
          { name: "Niphad", lat: 20.0886, lon: 74.1137 }
        ]
      },
      {
        name: "Jalgaon",
        cities: [
          { name: "Jalgaon City", lat: 21.0077, lon: 75.5626 },
          { name: "Bhusawal", lat: 21.0455, lon: 75.7668 }
        ]
      }
    ]
  },
  {
    name: "Punjab",
    districts: [
      {
        name: "Ludhiana",
        cities: [
          { name: "Ludhiana City", lat: 30.9010, lon: 75.8573 },
          { name: "Khanna", lat: 30.7046, lon: 76.2227 }
        ]
      },
      {
        name: "Amritsar",
        cities: [
          { name: "Amritsar City", lat: 31.6340, lon: 74.8723 },
          { name: "Tarn Taran", lat: 31.4496, lon: 74.9317 }
        ]
      }
    ]
  },
  {
    name: "Uttar Pradesh",
    districts: [
      {
        name: "Agra",
        cities: [
          { name: "Agra City", lat: 27.1767, lon: 78.0081 },
          { name: "Fatehabad", lat: 27.0256, lon: 78.2974 }
        ]
      },
      {
        name: "Varanasi",
        cities: [
          { name: "Varanasi City", lat: 25.3176, lon: 82.9739 },
          { name: "Pindara", lat: 25.4411, lon: 82.8530 }
        ]
      }
    ]
  }
];
