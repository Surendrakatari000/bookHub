let books = [
  {
    title: "The Alchemist",
    rating: 3.9,
    authorName: "Paulo Coelho",
    coverPic: "",
    aboutBook:
      "A mystical story of an Andalusian shepherd boy named Santiago who travels in search of a worldly treasure, learning wisdom about listening to the heart and following one's dreams.",
    aboutAuthor:
      "Paulo Coelho is a renowned Brazilian lyricist and novelist best known for his international bestselling novel The Alchemist.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Alchemist/gI_vEAAAQBAJ?hl=en&gbpv=1&dq=The+Alchemist&printsec=frontcover",
  },

  {
    title: "1984",
    rating: 4.2,
    authorName: "George Orwell",
    coverPic: "",
    aboutBook:
      "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism, mass surveillance, and widespread regimentation of persons and behaviours.",
    aboutAuthor:
      "George Orwell was an English novelist, essayist, journalist, and critic whose work is marked by lucid prose, awareness of social injustice, and opposition to totalitarianism.",
    bookUrl:
      "https://www.google.co.in/books/edition/Official_Gazette_of_the_United_States_Pa/ReG6y8kmNFwC?hl=en&gbpv=1&dq=1984&pg=RA1-PA144&printsec=frontcover",
  },
  {
    title: "Animal Farm",
    rating: 4.0,
    authorName: "George Orwell",
    coverPic: "",
    aboutBook:
      "An allegorical novella reflecting events leading up to the Russian Revolution and then on into the Stalinist era of the Soviet Union, featuring a group of farm animals who overthrow their human farmer.",
    aboutAuthor:
      "George Orwell was an English novelist, essayist, journalist, and critic whose work is marked by lucid prose, awareness of social injustice, and opposition to totalitarianism.",
    bookUrl:
      "https://www.google.co.in/books/edition/Animal_Farm/T9BUEQAAQBAJ?hl=en&gbpv=1&dq=animal+farm&printsec=frontcover",
  },

  {
    title: "A Brief History of Time",
    rating: 4.2,
    authorName: "Stephen Hawking",
    coverPic: "",
    aboutBook:
      "A landmark popular science book on cosmology by physicist Stephen Hawking, exploring the origins of the universe, space, time, black holes, and the search for a unified theory of physics.",
    aboutAuthor:
      "Stephen Hawking was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University of Cambridge.",
    bookUrl:
      "https://www.google.co.in/books/edition/A_Brief_History_Of_Time/9ysba1A1UF8C?hl=en&gbpv=1&dq=A+Brief+History+of+Time&pg=PT6&printsec=frontcover",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    rating: 4.1,
    authorName: "Stephen R. Covey",
    coverPic: "",
    aboutBook:
      "A self-improvement book written by Stephen R. Covey that presents a principle-centered approach for solving personal and professional problems through character ethics.",
    aboutAuthor:
      "Stephen R. Covey was an American educator, author, businessman, and keynote speaker best known for his immensely popular book on personal effectiveness.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_7_Habits_of_Highly_Effective_People/020TAgAAQBAJ?hl=en&gbpv=1",
  },
  {
    title: "How to Win Friends and Influence People",
    rating: 4.2,
    authorName: "Dale Carnegie",
    coverPic: "",
    aboutBook:
      "A self-help book published in 1936 that provides timeless advice on interpersonal skills, effective communication, and building influence with others.",
    aboutAuthor:
      "Dale Carnegie was an American writer and lecturer and the developer of famous courses in self-improvement, salesmanship, corporate training, public speaking, and interpersonal skills.",
    bookUrl:
      "https://www.google.co.in/books/edition/How_To_Win_Friends_and_Influence_People/vhjXEAAAQBAJ?hl=en&gbpv=1&dq=How+to+Win+Friends+and+Influence+People&printsec=frontcover",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    rating: 4.1,
    authorName: "Stephen R. Covey",
    coverPic: "",
    aboutBook:
      "A self-improvement book written by Stephen R. Covey that presents a principle-centered approach for solving personal and professional problems through character ethics.",
    aboutAuthor:
      "Stephen R. Covey was an American educator, author, businessman, and keynote speaker best known for his immensely popular book on personal effectiveness.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_7_Habits_of_Highly_Effective_People/020TAgAAQBAJ?hl=en&gbpv=1",
  },
  {
    title: "How to Win Friends and Influence People",
    rating: 4.2,
    authorName: "Dale Carnegie",
    coverPic: "",
    aboutBook:
      "A self-help book published in 1936 that provides timeless advice on interpersonal skills, effective communication, and building influence with others.",
    aboutAuthor:
      "Dale Carnegie was an American writer and lecturer and the developer of famous courses in self-improvement, salesmanship, corporate training, public speaking, and interpersonal skills.",
    bookUrl:
      "https://www.google.co.in/books/edition/How_To_Win_Friends_and_Influence_People/vhjXEAAAQBAJ?hl=en&gbpv=1&dq=How+to+Win+Friends+and+Influence+People&printsec=frontcover",
  },
  {
    title: "Atomic Habits",
    rating: 4.6,
    authorName: "James Clear",
    coverPic:
      "https://books.google.com/books/content/images/frontcover/fFCjDQAAQBAJ?fife=w400-h600",
    aboutBook:
      "A comprehensive, practical guide on how to build good habits, break bad ones, and get 1% better every day.",
    aboutAuthor:
      "James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.",
    bookUrl:
      "https://www.google.co.in/books/edition/Atomic_Habits/fFCjDQAAQBAJ?hl=en&gbpv=1&dq=Atomic+Habits&pg=PT24&printsec=frontcover",
  },
  {
    title: "Man's Search for Meaning",
    rating: 4.5,
    authorName: "Viktor E. Frankl",
    coverPic:
      "https://books.google.com/books/content/images/frontcover/F-Q_xGjWBi8C?fife=w400-h600",
    aboutBook:
      "Psychiatrist Viktor Frankl's memoir detailing his experiences in Nazi concentration camps and introducing his psychological theory of logotherapy.",
    aboutAuthor:
      "Viktor E. Frankl was an Austrian neurologist, psychiatrist, and Holocaust survivor.",
    bookUrl:
      "https://www.google.co.in/books/edition/Man_s_Search_for_Meaning/F-Q_xGjWBi8C?hl=en&gbpv=1&dq=Man%27s+Search+for+Meaning&printsec=frontcover",
  },
  {
    title: "Sapiens",
    rating: 4.4,
    authorName: "Yuval Noah Harari",
    coverPic: "",
    aboutBook:
      "A survey of the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.",
    aboutAuthor:
      "Yuval Noah Harari is an Israeli historian, philosopher, and professor in the Department of History at the Hebrew University of Jerusalem.",
    bookUrl:
      "https://www.google.co.in/books/edition/Sapiens_Tenth_Anniversary_Edition/MosvEQAAQBAJ?hl=en&gbpv=1&dq=Sapiens&printsec=frontcover",
  },
  {
    title: "The Chronicles of Narnia",
    rating: 4.5,
    authorName: "C.S. Lewis",
    coverPic: "",
    aboutBook:
      "A series of fantasy novels featuring a magical land of talking animals, mythical beasts, and a battle between good and evil.",
    aboutAuthor:
      "C.S. Lewis was a prolific British writer, literary scholar, and Anglican lay theologian best known for his classic children's fantasy series.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Chronicles_of_Narnia_Vol_I_The_Lion/6EIoDwAAQBAJ?hl=en&gbpv=1&dq=The+Chronicles+of+Narnia&printsec=frontcover",
  },
  {
    title: "The Kite Runner",
    rating: 4.3,
    authorName: "Khaled Hosseini",
    coverPic: "",
    aboutBook:
      "The story of Amir, a young boy from Kabul, and his journey toward redemption against the backdrop of a changing Afghanistan.",
    aboutAuthor:
      "Khaled Hosseini is an Afghan-American novelist, physician, and UNHCR Goodwill Ambassador.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Kite_Runner/KUMIEAAAQBAJ?hl=en&gbpv=1&dq=The+Kite+Runner&printsec=frontcover",
  },
  {
    title: "One Hundred Years of Solitude",
    rating: 4.1,
    authorName: "Gabriel García Márquez",
    coverPic: "",
    aboutBook:
      "A landmark magical realism novel telling the multi-generational story of the Buendía family in the fictional town of Macondo.",
    aboutAuthor:
      "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, awarded the Nobel Prize in Literature in 1982.",
    bookUrl:
      "https://www.google.co.in/books/edition/One_Hundred_Years_of_Solitude/AfB8EAAAQBAJ?hl=en&gbpv=1&dq=One+Hundred+Years+of+Solitude&printsec=frontcover",
  },
  {
    title: "The Adventures of Sherlock Holmes",
    rating: 4.3,
    authorName: "Arthur Conan Doyle",
    coverPic: "",
    aboutBook:
      "A collection of twelve short stories featuring the brilliant consulting detective Sherlock Holmes and his loyal friend Dr. Watson.",
    aboutAuthor:
      "Sir Arthur Conan Doyle was a British writer and physician who created the iconic fictional character Sherlock Holmes.",
    bookUrl:
      "https://www.google.co.in/books/edition/Adventures_of_Sherlock_Holmes/buc0AAAAMAAJ?hl=en&gbpv=1&dq=The+Adventures+of+Sherlock+Holmes&printsec=frontcover",
  },
  {
    title: "Les Misérables",
    rating: 4.4,
    authorName: "Victor Hugo",
    coverPic: "",
    aboutBook:
      "An epic historical novel following the struggles of ex-convict Jean Valjean and his quest for redemption in 19th-century France.",
    aboutAuthor:
      "Victor Hugo was a French poet, novelist, and dramatist of the Romantic movement.",
    bookUrl:
      "https://www.google.co.in/books/edition/Les_mis%C3%A9rables/fb7w8JSQN1MC?hl=en&gbpv=1&dq=Les+Mis%C3%A9rables&pg=PA28&printsec=frontcover",
  },
  {
    title: "The Count of Monte Cristo",
    rating: 4.5,
    authorName: "Alexandre Dumas",
    coverPic: "",
    aboutBook:
      "An adventure novel centering on a man who is wrongfully imprisoned, escapes, acquires a vast fortune, and exacts revenge on his betrayers.",
    aboutAuthor:
      "Alexandre Dumas was a French novelist whose works have been translated into nearly a hundred languages and made into numerous films.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Count_of_Monte_Cristo/hxxoGjkHQygC?hl=en&gbpv=1&dq=The+Count+of+Monte+Cristo&printsec=frontcover",
  },
  {
    title: "War and Peace",
    rating: 4.2,
    authorName: "Leo Tolstoy",
    coverPic: "",
    aboutBook:
      "A vast epic detailing the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five aristocratic families.",
    aboutAuthor:
      "Leo Tolstoy was a Russian writer widely regarded as one of the greatest authors of all time.",
    bookUrl:
      "https://www.google.co.in/books/edition/War_and_peace/Ou-rdfU5t7kC?hl=en&gbpv=1&dq=War+and+Peace&pg=PA108&printsec=frontcover",
  },
  {
    title: "The Brothers Karamazov",
    rating: 4.3,
    authorName: "Fyodor Dostoevsky",
    coverPic: "",
    aboutBook:
      "A passionate philosophical novel entering deep into debates of faith, doubt, morality, and free will, centered around the murder of a corrupt landowner.",
    aboutAuthor:
      "Fyodor Dostoevsky was a Russian novelist, philosopher, and essayist whose literary works explore human psychology in the turbulent political, social, and spiritual atmosphere of 19th-century Russia.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Brothers_Karamazov/OG0e6djUgUYC?hl=en&gbpv=1&dq=The+Brothers+Karamazov&printsec=frontcover",
  },
  {
    title: "Crime and Punishment",
    rating: 4.3,
    authorName: "Fyodor Dostoevsky",
    coverPic: "",
    aboutBook:
      "A psychological thriller tracking the mental anguish and moral dilemmas of an impoverished former student in St. Petersburg who plans and executes a fateful crime.",
    aboutAuthor:
      "Fyodor Dostoevsky was a renowned Russian novelist whose works profoundly influenced modern fiction and psychological exploration.",
    bookUrl:
      "https://www.google.co.in/books/edition/Encyclopedia_of_Crime_and_Punishment/rTKGPEIoRxoC?hl=en&gbpv=1&dq=Crime+and+Punishment&pg=PR33&printsec=frontcover",
  },
  {
    title: "Frankenstein",
    rating: 4.0,
    authorName: "Mary Shelley",
    coverPic: "",
    aboutBook:
      "A gothic science fiction novel about young scientist Victor Frankenstein, who gives life to a creature in an unorthodox scientific experiment, with tragic consequences.",
    aboutAuthor:
      "Mary Shelley was an English novelist who wrote the gothic novel Frankenstein and edited the works of her husband, Percy Bysshe Shelley.",
    bookUrl:
      "https://www.google.co.in/books/edition/Frankenstein_s_Science/sz4Yuz-E-EgC?hl=en&gbpv=1&dq=Frankenstein&pg=PA93&printsec=frontcover",
  },
  {
    title: "The Little Prince",
    rating: 4.6,
    authorName: "Antoine de Saint-Exupéry",
    coverPic: "",
    aboutBook:
      "A poetic tale of a young prince who visits various planets in space, addressing themes of loneliness, friendship, love, and loss.",
    aboutAuthor:
      "Antoine de Saint-Exupéry was a French writer, poet, aristocrat, journalist, and pioneering aviator.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Little_Prince/jM_WDwAAQBAJ?hl=en&gbpv=1&dq=The+Little+Prince&printsec=frontcover",
  },
  {
    title: "The Silent Patient",
    rating: 4.1,
    authorName: "Alex Michaelides",
    coverPic: "",
    aboutBook:
      "A psychological thriller about a woman who shoots her husband five times and then never speaks another word, and the criminal psychotherapist obsessed with uncovering her motive.",
    aboutAuthor:
      "Alex Michaelides is a bestselling British-Cypriot author and screenwriter.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Silent_Patient/a6NnDwAAQBAJ?hl=en&gbpv=1&dq=The+Silent+Patient&printsec=frontcover",
  },
  {
    title: "Where the Crawdads Sing",
    rating: 4.4,
    authorName: "Delia Owens",
    coverPic: "",
    aboutBook:
      "A story centering on Kya Clark, an isolated girl who grows up in the marshes of North Carolina and becomes a suspect in a local murder investigation.",
    aboutAuthor: "Delia Owens is an American author and zoologist.",
    bookUrl:
      "https://www.google.co.in/books/edition/Where_the_Crawdads_Sing_Reese_s_Book_Clu/CGVDDwAAQBAJ?hl=en&gbpv=1&dq=Where+the+Crawdads+Sing&printsec=frontcover",
  },
  {
    title: "The Fault in Our Stars",
    rating: 4.3,
    authorName: "John Green",
    coverPic: "",
    aboutBook:
      "A heartbreaking and witty young adult romance following Hazel Grace Lancaster, a sixteen-year-old cancer patient who falls in love with Augustus Waters.",
    aboutAuthor:
      "John Green is an American author, vlogger, and creator of online educational channels.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_Fault_in_Our_Stars/Qk8n0olOX5MC?hl=en&gbpv=1&dq=The+Fault+in+Our+Stars&printsec=frontcover",
  },
  {
    title: "A Man Called Ove",
    rating: 4.4,
    authorName: "Fredrik Backman",
    coverPic: "",
    aboutBook:
      "A heartwarming comedy-drama about a grumpy, isolated old man whose rigid world is turned upside down by an eccentric young family moving in next door.",
    aboutAuthor:
      "Fredrik Backman is a Swedish columnist, blogger, and bestselling author.",
    bookUrl:
      "https://www.google.co.in/books/edition/A_Man_Called_Ove/7mtNAgAAQBAJ?hl=en&gbpv=1&dq=A+Man+Called+Ove&printsec=frontcover",
  },
  {
    title: "Normal People",
    rating: 3.8,
    authorName: "Sally Rooney",
    coverPic: "",
    aboutBook:
      "A complex contemporary novel following the tender yet complicated relationship of Marianne and Connell from their high school days through their undergraduate years at Trinity College Dublin.",
    aboutAuthor:
      "Sally Rooney is an Irish novelist and screenwriter known for her authentic contemporary fiction.",
    bookUrl:
      "https://www.google.co.in/books/edition/Normal_People/x3tgDwAAQBAJ?hl=en&gbpv=1&dq=Normal+People&printsec=frontcover",
  },
  {
    title: "Thinking, Fast and Slow",
    rating: 4.2,
    authorName: "Daniel Kahneman",
    coverPic: "",
    aboutBook:
      "A popular science book summarizing research that explains the two systems that drive the way we think: System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    aboutAuthor:
      "Daniel Kahneman was an Israeli-American psychologist and economist notable for his work on the psychology of judgment and decision-making.",
    bookUrl:
      "https://www.google.co.in/books/edition/Thinking_Fast_and_Slow/oV1tXT3HigoC?hl=en&gbpv=1&dq=Thinking,+Fast+and+Slow&pg=PT49&printsec=frontcover",
  },
  {
    title: "Can't Hurt Me",
    rating: 4.5,
    authorName: "David Goggins",
    coverPic: "",
    aboutBook:
      "A memoir and self-help guide detailing Goggins' transformation from a depressed, overweight young man with a traumatic past into a top endurance athlete and Navy SEAL.",
    aboutAuthor:
      "David Goggins is a retired United States Navy SEAL, ultramarathon runner, and public speaker.",
    bookUrl:
      "https://www.google.co.in/books/edition/Can_t_Hurt_Me/IeYmEAAAQBAJ?hl=en&gbpv=1&dq=Can%27t+Hurt+Me&printsec=frontcover",
  },
  {
    title: "The 5 AM Club",
    rating: 3.9,
    authorName: "Robin Sharma",
    coverPic: "",
    aboutBook:
      "A leadership and productivity fable that emphasizes waking up early to optimize your mornings, build personal mastery, and achieve peak performance.",
    aboutAuthor:
      "Robin Sharma is a Canadian writer, speaker, and leadership expert.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_5_AM_Club/-GWBDwAAQBAJ?hl=en&gbpv=1&dq=The+5+AM+Club&printsec=frontcover",
  },
  {
    title: "Ikigai",
    rating: 4.1,
    authorName: "Héctor García and Francesc Miralles",
    coverPic: "",
    aboutBook:
      "An exploration of the Japanese concept of 'ikigai'—meaning 'a reason for being'—drawing secrets of longevity and happiness from the inhabitants of Okinawa.",
    aboutAuthor:
      "Héctor García and Francesc Miralles are authors who specialize in Japanese culture and philosophy.",
    bookUrl:
      "https://www.google.co.in/books/edition/Ikigai/MDksDwAAQBAJ?hl=en&gbpv=1&dq=Ikigai&printsec=frontcover",
  },
  {
    title: "The 48 Laws of Power",
    rating: 4.2,
    authorName: "Robert Greene",
    coverPic: "",
    aboutBook:
      "A provocative and tactical guide drawing on historical philosophies to explain how power is achieved, defended, and maneuvered through human interaction.",
    aboutAuthor:
      "Robert Greene is an American author known for his books on strategy, power, and seduction.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_48_Laws_Of_Power/P_zMW3EHnTEC?hl=en&gbpv=1&dq=The+48+Laws+of+Power&printsec=frontcover",
  },
  {
    title: "The 4-Hour Workweek",
    rating: 3.9,
    authorName: "Timothy Ferriss",
    coverPic: "",
    aboutBook:
      "A lifestyle design guide that challenges traditional notions of retirement and work, advocating for outsourcing, automation, and minimizing hours worked.",
    aboutAuthor:
      "Timothy Ferriss is an American investor, author, and lifestyle entrepreneur.",
    bookUrl:
      "https://www.google.co.in/books/edition/The_4_Hour_Work_Week/tQ1C-rvAfJUC?hl=en&gbpv=1&dq=The+4-Hour+Workweek&printsec=frontcover",
  },
  {
    title: "Outliers",
    rating: 4.1,
    authorName: "Malcolm Gladwell",
    coverPic: "",
    aboutBook:
      "An examination of the factors that contribute to high levels of success, looking closely at culture, family, generation, and idiosyncratic experiences.",
    aboutAuthor:
      "Malcolm Gladwell is a Canadian journalist, author, and staff writer for The New Yorker.",
    bookUrl:
      "https://www.google.co.in/books/edition/Outlier_Detection_in_Python/56E1EQAAQBAJ?hl=en&gbpv=1&dq=Outliers&pg=PA91&printsec=frontcover",
  },
  {
    title: "Rich Dad Poor Dad",
    rating: 4.1,
    authorName: "Robert T. Kiyosaki",
    coverPic: "",
    aboutBook:
      "A personal finance book advocating financial independence, asset building, real estate investment, and financial literacy.",
    aboutAuthor:
      "Robert T. Kiyosaki is an American businessman and motivational author.",
    bookUrl:
      "https://www.google.co.in/books/edition/Rich_Dad_Poor_Dad_What_the_Rich_Teach_Th/kRqeDwAAQBAJ?hl=en&gbpv=1&dq=rich+dad+poor+dad&printsec=frontcover",
  },
];
