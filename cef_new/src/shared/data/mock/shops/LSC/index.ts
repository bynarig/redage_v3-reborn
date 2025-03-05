// Mock data for LSCustoms development

export interface MockCategoryItem {
	title: string;
	desc: string;
	category: string | number;
  }
  
  export interface MockListItem {
	index: number;
	name: string;
	price: number;
  }
  
  // Mock categories for customization
  export const mockCategories: MockCategoryItem[] = [
	{
	  title: "Внешний тюнинг",
	  desc: "Визуальные модификации",
	  category: "appearance"
	},
	{
	  title: "Двигатель",
	  desc: "Увеличение мощности",
	  category: "engine"
	},
	{
	  title: "Трансмиссия",
	  desc: "Улучшение передачи мощности",
	  category: "transmission"
	},
	{
	  title: "Тормоза",
	  desc: "Улучшение торможения",
	  category: "brakes"
	},
	{
	  title: "Подвеска",
	  desc: "Настройка высоты и жесткости",
	  category: "suspension"
	},
	{
	  title: "Покраска",
	  desc: "Изменение цвета кузова и деталей",
	  category: "paint"
	},
	{
	  title: "Колеса",
	  desc: "Диски и шины",
	  category: "wheels"
	}
  ];
  
  // Mock items for each category
  export const getMockListItems = (category: string | number): MockListItem[] => {
	switch(category) {
	  case "appearance":
		return [
		  { index: 0, name: "Стандартный бампер", price: 0 },
		  { index: 1, name: "Спортивный бампер", price: 2500 },
		  { index: 2, name: "Карбоновый бампер", price: 5000 },
		  { index: 3, name: "Гоночный бампер", price: 7500 }
		];
	  case "engine":
		return [
		  { index: 0, name: "Стандартный двигатель", price: 0 },
		  { index: 1, name: "Двигатель уровень 1", price: 5000 },
		  { index: 2, name: "Двигатель уровень 2", price: 10000 },
		  { index: 3, name: "Двигатель уровень 3", price: 15000 },
		  { index: 4, name: "Двигатель уровень 4", price: 20000 }
		];
	  case "transmission":
		return [
		  { index: 0, name: "Стандартная КПП", price: 0 },
		  { index: 1, name: "Спортивная КПП", price: 8000 },
		  { index: 2, name: "Гоночная КПП", price: 12000 }
		];
	  case "brakes":
		return [
		  { index: 0, name: "Стандартные тормоза", price: 0 },
		  { index: 1, name: "Спортивные тормоза", price: 6000 },
		  { index: 2, name: "Гоночные тормоза", price: 9000 }
		];
	  case "suspension":
		return [
		  { index: 0, name: "Стандартная подвеска", price: 0 },
		  { index: 1, name: "Заниженная подвеска", price: 3000 },
		  { index: 2, name: "Спортивная подвеска", price: 6000 },
		  { index: 3, name: "Гоночная подвеска", price: 9000 }
		];
	  case "paint":
		return [
		  { index: 0, name: "Базовая покраска", price: 1000 },
		  { index: 1, name: "Металлик", price: 3000 },
		  { index: 2, name: "Перламутр", price: 5000 },
		  { index: 3, name: "Матовая покраска", price: 7000 }
		];
	  case "wheels":
		return [
		  { index: 0, name: "Стандартные колеса", price: 0 },
		  { index: 1, name: "Спортивные колеса", price: 4000 },
		  { index: 2, name: "Внедорожные колеса", price: 6000 },
		  { index: 3, name: "Тюнинг колеса", price: 8000 }
		];
	  default:
		return [];
	}
  };
  
  // Mock vehicle stats
  export const mockVehicleStats = {
	max: {
	  speed: 100,
	  brakes: 100,
	  boost: 100,
	  clutch: 100
	},
	current: {
	  speed: 60,
	  brakes: 40,
	  boost: 50,
	  clutch: 45
	}
  };