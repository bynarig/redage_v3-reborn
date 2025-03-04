export const mockBlackjackData = {
  player: {
    id: 1,
    name: "Player_123",
    money: 15000,
    bet: 500,
    cards: [
      { suit: "hearts", value: "A", hidden: false },
      { suit: "clubs", value: "10", hidden: false }
    ],
    score: 21,
    state: "playing" // 'waiting', 'betting', 'playing', 'won', 'lost', 'push'
  },
  dealer: {
    cards: [
      { suit: "diamonds", value: "7", hidden: false },
      { suit: "spades", value: "Q", hidden: true }
    ],
    score: 7, // Visible score only
    state: "dealing" // 'waiting', 'dealing', 'revealing', 'done'
  },
  table: {
    id: 3,
    minBet: 100,
    maxBet: 10000,
    timeLeft: 15, // Seconds left to make decision
    otherPlayers: [
      {
        id: 2,
        name: "User456",
        bet: 200,
        cards: [
          { suit: "spades", value: "8", hidden: false },
          { suit: "hearts", value: "5", hidden: false }
        ],
        state: "playing"
      },
      {
        id: 3,
        name: "User789",
        bet: 1000,
        cards: [
          { suit: "diamonds", value: "K", hidden: false },
          { suit: "hearts", value: "9", hidden: false }
        ],
        state: "playing"
      }
    ]
  },
  gameState: "playing", // 'waiting', 'betting', 'playing', 'results'
  availableActions: ["hit", "stand", "double", "surrender"],
  bettingOptions: [100, 200, 500, 1000, 5000],
  results: null, // Will contain win/loss info when game ends
  tableHistory: [
    { winner: "player", amount: 300, time: "15:32" },
    { winner: "dealer", amount: 500, time: "15:30" },
    { winner: "player", amount: 1000, time: "15:27" }
  ]
};