export const generateMockCars = () => {
    const mockCars = [
        {
            modelName: "Mock Car 1",
            price: 50000,
            speed: 200,
            boost: 5.2,
            seat: 4,
            invslots: 25,
            desc: "A high-performance mock car for testing purposes.",
            gosPrice: 55000,
            index: 0,
        },
        {
            modelName: "Mock Car 2",
            price: 75000,
            speed: 220,
            boost: 4.8,
            seat: 2,
            invslots: 20,
            desc: "A sporty mock car with excellent acceleration.",
            gosPrice: 80000,
            index: 1,
        },
        {
            modelName: "Mock Car 3",
            price: 30000,
            speed: 180,
            boost: 6.0,
            seat: 5,
            invslots: 30,
            desc: "A family-friendly mock car with ample space.",
            gosPrice: 35000,
            index: 2,
        },
    ];

    return mockCars;
};