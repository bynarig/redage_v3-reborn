// Mock data for fraction clothes component

export const mockFractionClothesData = {
	type: "police", // Can be: police, army, ems, etc.
	json: JSON.stringify(["Hats", "Glasses", "Masks", "Tops", "Undershort", "Legs", "Shoes", "Watches"]),
	isDonate: false
  };
  
  // Mock implementation of dictionaries
  export const mockDictionaries = {
	"Hats": JSON.stringify([
	  {
		Id: 1,
		Name: "Police Hat",
		TName: "Police Hat Regular",
		Variation: 46,
		descName: "Police Hat Standard",
		Textures: [0, 1, 2],
		Price: 500,
		Donate: 0,
		IsHat: true
	  },
	  {
		Id: 2,
		Name: "Sheriff Hat",
		TName: "Sheriff Hat Deluxe",
		Variation: 45,
		descName: "Sheriff Department Hat",
		Textures: [0, 1],
		Price: 650,
		Donate: 0,
		IsHat: true
	  }
	]),
	"Glasses": JSON.stringify([
	  {
		Id: 1,
		Name: "Tactical Glasses",
		TName: "Tactical Glasses Dark",
		Variation: 25,
		descName: "Tactical Shades",
		Textures: [0, 1, 2, 3],
		Price: 300,
		Donate: 0,
		IsGlasses: true
	  }
	]),
	"Tops": JSON.stringify([
	  {
		Id: 1,
		Name: "Police Uniform",
		TName: "Police Standard Uniform",
		Variation: 55,
		descName: "Police Standard Uniform",
		Textures: [0, 1, 2, 3],
		Price: 1200,
		Donate: 0,
		Torso: 11
	  },
	  {
		Id: 2,
		Name: "Tactical Vest",
		TName: "Police Tactical Vest",
		Variation: 53,
		descName: "SWAT Tactical Vest",
		Textures: [0, 1],
		Price: 1800,
		Donate: 0,
		Torso: 13
	  }
	]),
	"Legs": JSON.stringify([
	  {
		Id: 1,
		Name: "Police Pants",
		TName: "Police Uniform Pants",
		Variation: 35,
		descName: "Standard Issue Pants",
		Textures: [0, 1],
		Price: 800,
		Donate: 0
	  },
	  {
		Id: 2,
		Name: "Tactical Pants",
		TName: "Tactical Combat Pants",
		Variation: 33,
		descName: "SWAT Combat Pants",
		Textures: [0, 1, 2],
		Price: 1100,
		Donate: 0
	  }
	]),
	"Shoes": JSON.stringify([
	  {
		Id: 1,
		Name: "Tactical Boots",
		TName: "Police Tactical Boots",
		Variation: 25,
		descName: "Standard Issue Boots",
		Textures: [0],
		Price: 550,
		Donate: 0
	  }
	]),
	"Watches": JSON.stringify([
	  {
		Id: 1,
		Name: "Police Watch",
		TName: "Department Watch",
		Variation: 5,
		descName: "Department Standard Watch",
		Textures: [0],
		Price: 350,
		Donate: 0
	  }
	]),
	"Masks": JSON.stringify([
	  {
		Id: 1,
		Name: "Tactical Balaclava",
		TName: "SWAT Balaclava",
		Variation: 52,
		descName: "SWAT Face Cover",
		Textures: [0, 1],
		Price: 750,
		Donate: 0
	  }
	]),
	"Undershort": JSON.stringify([
	  {
		Id: 1,
		Name: "Department T-Shirt",
		TName: "Under Shirt Standard",
		Variation: 58,
		descName: "Standard Undershirt",
		Textures: [0],
		Price: 200,
		Donate: 0,
		Torso: 0
	  }
	])
  };