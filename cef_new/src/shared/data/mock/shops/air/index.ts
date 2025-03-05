// Mock data for development
interface VehicleItem {
	Model: string;
	Number: string;
	Price: number;
	IsSpawn: boolean;
  }

export const mockAirVehicles: VehicleItem[] = [
	{
	  Model: "Buzzard",
	  Number: "AIR001",
	  Price: 750000,
	  IsSpawn: false
	},
	{
	  Model: "Frogger",
	  Number: "AIR002",
	  Price: 1100000,
	  IsSpawn: true
	},
	{
	  Model: "Maverick",
	  Number: "AIR003",
	  Price: 1350000,
	  IsSpawn: false
	},
	{
	  Model: "Swift",
	  Number: "AIR004",
	  Price: 1500000,
	  IsSpawn: false
	},
	{
	  Model: "Luxor",
	  Number: "AIR005",
	  Price: 2150000,
	  IsSpawn: true
	},
	{
	  Model: "Shamal",
	  Number: "AIR006",
	  Price: 1950000,
	  IsSpawn: false
	}
  ];