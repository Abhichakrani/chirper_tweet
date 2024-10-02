let DB = {
  users: [
    {
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "123456",
      profileImage: "https://placehold.co/300?text=T",
      isLoggedin: false,
      isVerified: true,
      tweets: [
        {
          tweetContent: "Test tweet one",
          timeStamp: "2024-07-15",
        },
        {
          tweetContent: "Test tweet two",
          timeStamp: "2024-07-12",
        },
        {
          tweetContent: "Test tweet three",
          timeStamp: "2024-07-01",
        },
        {
          tweetContent: "Test tweet Four",
          timeStamp: "2024-07-01",
        },
      ],
    },
    {
      username: "dummyuser",
      firstName: "Dummy",
      lastName: "User",
      email: "dummyuser@test.com",
      password: "654321",
      profileImage: "https://placehold.co/300?text=D",
      isLoggedin: false,
      tweets: [
        {
          tweetContent: "Dummy tweet one",
          timeStamp: "2024-07-15",
        },
        {
          tweetContent: "Dummy tweet two",
          timeStamp: "2024-07-12",
        },
        {
          tweetContent: "Dummy tweet three",
          timeStamp: "2024-07-01",
        },
      ],
    },
  ],
};
