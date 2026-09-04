const oldBooks = [
  {
    "_id": "7b3c76de-2837-415b-94ae-8a3103faf9bb",
    "title": "Beyond the Village Pond",
    "rating": 4.2,
    "authorName": "Shivdev Singh",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/beyond-the-village-pond-book.png",
    "aboutBook": "In Beyond the Village Pond, Shivdev Singh draws upon memories of his childhood and early youth to paint an affectionate and idyllic picture of life in Punjab, especially rural Punjab. In lyrical prose, he shows us villages where dawn breaks to the song of a farmer walking to his field. ",
    "aboutAuthor": "In Beyond the Village Pond, Shivdev Singh draws upon memories of his childhood and early youth to paint an affectionate and idyllic picture of life in Punjab, especially rural Punjab."
  },
  {
    "_id": "561d0af9-3cec-426d-9721-35ed8d7e9c3c",
    "title": "Seasons of Moon and Flame",
    "rating": 4.9,
    "authorName": "Danielle Dulsky",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/seasons-of-moon-and-flame-book.png",
    "aboutBook": "The yearning to slow down and simplify, return to the earth, and maybe even rewild what has been tamed in ourselves persists even though that dream may seem ever more remote in contemporary life.",
    "aboutAuthor": "Danielle Dulsky believes in the power of the wild feminine and human-to-nature intimacy."
  },
  {
    "_id": "bfcd0883-d5d0-40d3-9977-e99fb2bad3ab",
    "title": "The Fault in Our Stars",
    "rating": 4.1,
    "authorName": "John Green",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-fault-in-our-stars-book.png",
    "aboutBook": "The Fault In Our Stars is a fabulous book about a young teenage girl who has been diagnosed with lung cancer and attends a cancer support group. Hazel is 16 and is reluctant to go to the support group, but she soon realises that it was a good idea. Hazel meets a young boy named Augustus Waters.",
    "aboutAuthor": "John Green is an American author, YouTube content creator, and podcaster. He won the 2006 Printz Award for his debut novel, Looking for Alaska, and has had several the debut of his book at number one on The New York Times Best Seller list, including his most popular novel, The Fault in Our Stars. "
  },
  {
    "_id": "229b7771-978a-4fca-9538-846ab17dde14",
    "title": "I Will Give You the Sun",
    "rating": 4.1,
    "authorName": "Jandy Nelson",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/i-will-you-give-the-sun-book.png",
    "aboutBook": "Plot. Noah and Jude are twins. As they enter their teen years, they grow apart. This is partly due to their sibling rivalry, as they compete for the attention of their mother, Dianna; and partly due to their struggle to be able to understand their separate identities.",
    "aboutAuthor": "Jandy Nelson is an American author of young adult fiction. Prior to her career as an author, Nelson worked for 13 years as a literary agent at Manus & Associates Literary Agency."
  },
  {
    "_id": "a869e249-d1dd-4f24-972b-babc1c665146",
    "title": "The German Midwife",
    "rating": 4.4,
    "authorName": "Mandy Robotham",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-german-midwife-book.png",
    "aboutBook": "Germany, 1944. A prisoner in the camps, Anke Hoff is doing what she can to keep her pregnant campmates and their newborns alive. But when Anke work is noticed, she is chosen for a task more dangerous than she could ever have imagined.",
    "aboutAuthor": "Mandy Robotham is a Globe and Mail, USA Today, and Canadian, US and Australian Kindle Top 100 bestseller. She has been an aspiring author from the age of nine, but was waylaid by journalism and later enticed by birth."
  },
  {
    "_id": "fd0b91f2-8167-4449-b5ff-baa87bb918d1",
    "title": "Say That Again",
    "rating": 3.5,
    "authorName": "N. Gemini Sasson",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/say-that-again-book.png",
    "aboutBook": "A runaway teen. A homeless drifter. And how a stolen dog teaches them the meaning of family. Not yet sixteen, Bellamy Larson or Beam, as she had rather be called remembers everything. She has a condition called Highly Superior Autobiographical Memory.",
    "aboutAuthor": "N. Gemini Sasson is the author of two contemporary series and seven historical novels set in 14th and 15th century Scotland, England and Wales. Long after writing about Robert the Bruce and Queen Isabella, Sasson learned she is a descendant of both."
  },
  {
    "_id": "fb3cf65e-fd0f-4053-b525-8e9af7cf553e",
    "title": "A Girl That Had To Be Strong",
    "rating": 4.8,
    "authorName": "Garima Pradhan",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-girl-that-had-to-be-strong-book.png",
    "aboutBook": "A Girl That Had To Be Strong is a roller coaster and adventurous journey of a girl named advika who struggled with her birth. She is unaware of her connection with Lord Ganesha being a girl with a different perspective on life.",
    "aboutAuthor": "Garima Pradhan is the Author of A Girl That Had to be STRONG. She started writing when she was 24 years old. She is born and brought up in the beautiful city of lakes Bhopal. She did her schooling until her third STD from Demonstration School Bhopal and was awarded the Best Student Award there."
  },
  {
    "_id": "a2e055e0-be66-4af5-8ff5-857dba47a46d",
    "title": "The Sky Is Every Where",
    "rating": 3.5,
    "authorName": "Jandy Nelson",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-sky-is-every-where-book.png",
    "aboutBook": "It tells the story of an American high school girl, Lennie Walker, struggling to cope with the sudden death of her older sister. Lennie becomes romantically involved both with her sister former fiance, who shares grief and loss and with a new boy in town.",
    "aboutAuthor": "Jandy Nelson is an American author of young adult fiction. Prior to her career as an author, Nelson worked for 13 years as a literary agent at Manus & Associates Literary Agency."
  },
  {
    "_id": "a9f36490-6ba4-4343-8cf7-5f2558b46e06",
    "title": "Eat That Frog",
    "rating": 4.3,
    "authorName": "Brian Tracy",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/eat-that-frog-book.png",
    "aboutBook": "Tracy says that you need to find ways to motivate yourself to eat your frogs by putting the same pressure on yourself that you feel when you are assigned a task and deadline by your boss. Create your own deadlines, try to beat the deadlines you have set, and hold yourself to high expectations.",
    "aboutAuthor": "Brian Tracy is a Canadian-American motivational public speaker. He is the author of over eighty books that have been translated into dozens of languages. His popular books are Earn What You are Really Worth, Eat That Frog."
  },
  {
    "_id": "78e0519f-9072-4a59-8ce7-5e25263694c2",
    "title": "Treasure Island one",
    "rating": 4.1,
    "authorName": "Robert Louis Stevenson",
    "coverPic": "https://covers.openlibrary.org/b/olid/OL26331905M-M.jpg",
    "aboutBook": "A gripping pirate adventure of treasure maps, mutiny, and high seas excitement.",
    "aboutAuthor": "Robert Louis Stevenson was a Scottish novelist and travel writer known for his adventure stories.",
    "createdAt": "2026-01-29T15:41:17.933Z",
    "updatedAt": "2026-08-10T09:04:53.688Z",
    "__v": 0
  },
  {
    "_id": "35966d34-ee9e-4d76-a1ec-9e128b041b6e",
    "title": "The Ones We Choose",
    "rating": 4,
    "authorName": "Julie Clark",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-ones-we-choose-book.png",
    "aboutBook": "The powerful forces of science and family collide when geneticist Paige Robson finds her world in upheaval: Her Miles is struggling to fit in at his new school and begins asking questions about his biological father that Paige can not answer until fate thrusts the anonymous donor",
    "aboutAuthor": "Julie Clark is the New York Times bestselling author of The Ones We Choose and The Last Flight, which was also an international bestseller and has been translated into more than twenty languages."
  },
  {
    "_id": "8301d74f-fa98-4fc7-a0d7-96b0b8d67bc9",
    "title": "The Help",
    "rating": 4.5,
    "authorName": "Kathryn Stockett",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-novel-book.png",
    "aboutBook": "The Help, tells the story of black maids working in white Southern homes in the early 1960s in Jackson, Mississippi, and of Miss Eugenia Skeeter Phelan, a Ole Miss, who returns to her family cotton plantation, longleaf, to find that her beloved maid",
    "aboutAuthor": "Kathryn Stockett is an American novelist. She is known for her 2009 debut novel, The Help, which is about African American maids working in white households in Jackson, Mississippi, during the 1960s."
  },
  {
    "_id": "2ece92fb-c131-43b1-9c07-6f32bc465d01",
    "title": "Half Girlfriend",
    "rating": 4.2,
    "authorName": "Chetan Bhagat",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/half-girlfriend-book.png",
    "aboutBook": "Half Girlfriend is an Indian English coming of age, young adult romance novel by Indian author Chetan Bhagat. The novel, set in rural Bihar, New Delhi, Patna, and New York, is the story of a Bihari boy in quest of winning over the girl he loves.",
    "aboutAuthor": "Chetan Bhagat is an Indian author and columnist. He was included in Time magazine's list of World's 100 Most Influential People in 2010.",
    "updatedAt": "2026-08-10T09:04:04.496Z"
  },
  {
    "_id": "ca1cd543-f156-41d7-a640-a333890f011f",
    "title": "Star in the Storm",
    "rating": 3.2,
    "authorName": "Joan Hiatt Harlow",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/star-in-the-storm-book.png",
    "aboutBook": "A RISKY SECRET All non-sheepherding dogs have been outlawed from the rocky coastal village where Maggie lives. Unwilling to give up her beloved Newfoundland, Sirius, Maggie defies the law and hides Sirius away.",
    "aboutAuthor": "Joan Hiatt Harlow is the author of several popular historical novels including Secret of the Night Ponies, Shadows on the Sea, Midnight Rider, Star in the Storm, Joshua Song, Thunder from the Sea, and Breaker Boy."
  },
  {
    "_id": "c18b3c44-048c-4207-b585-7f97e7d107f9",
    "title": "Don Quixote",
    "rating": 4.3,
    "authorName": "Miguel de Cervantes",
    "coverPic": "https://covers.openlibrary.org/b/olid/OL24358602M-M.jpg",
    "aboutBook": "A Spanish classic about an aging noble who becomes a knight-errant to revive chivalry and fight injustice.",
    "aboutAuthor": "Miguel de Cervantes is one of the greatest writers in Spanish literature, best known for this seminal work.",
    "createdAt": "2026-01-28T17:53:34.860Z",
    "updatedAt": "2026-01-28T17:53:34.860Z",
    "__v": 0
  },
  {
    "_id": "3422ec54-674e-4751-a131-80194d5427b0",
    "title": "Alice's Adventures in Wonderland",
    "rating": 4.2,
    "authorName": "Lewis Carroll",
    "coverPic": "https://covers.openlibrary.org/b/olid/OL26331903M-M.jpg",
    "aboutBook": "A whimsical journey into a surreal world where logic is turned upside down and imagination reigns.",
    "aboutAuthor": "Lewis Carroll was an English writer and mathematician famed for his imaginative storytelling.",
    "createdAt": "2026-01-28T18:00:45.475Z",
    "updatedAt": "2026-01-29T15:25:21.463Z",
    "__v": 0
  },
  {
    "_id": "749ea04d-163b-43f3-8c3e-67e58b6e4d8d",
    "title": "The Adventures of Huckleberry Finn",
    "rating": 4.4,
    "authorName": "Mark Twain",
    "coverPic": "https://covers.openlibrary.org/b/olid/OL25458728M-M.jpg",
    "aboutBook": "A young boy and a runaway slave raft down the Mississippi River in this classic American tale.",
    "aboutAuthor": "Mark Twain was an American author and humorist known for his sharp social commentary.",
    "createdAt": "2026-01-29T14:19:55.839Z",
    "updatedAt": "2026-01-29T14:19:55.839Z",
    "__v": 0
  },
  {
    "_id": "1c9201d5-ffa9-4750-ad92-a5ce6009a747",
    "title": "Harry Porter",
    "rating": 4.8,
    "authorName": "J. K. Rowling",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/harry-potter-book.png",
    "aboutBook": "It is a story about Harry Potter, an orphan brought up by his aunt and uncle because his parents were killed when he was a baby. Harry is unloved by his uncle and aunt but everything changes when he is invited to join Hogwarts School of Witchcraft and Wizardry and he finds out he is a wizard.",
    "aboutAuthor": "J.K. Rowling is the British author who created the popular and critically acclaimed Harry Potter series about a lonely orphan who discovers that he is actually a wizard and enrols in the Hogwarts School of Witchcraft and Wizardry."
  },
  {
    "_id": "54402549-a4bd-4c99-a176-bd795d47173a",
    "title": "One life one chance",
    "rating": 4.2,
    "authorName": "Luke Richmond",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/one-life-one-chance-book.png",
    "aboutBook": "In this lifetime, you only have just one opportunity to make it happen. Inspirational book understanding your actions and efforts. Establishing goals and following through, understanding life and its obstacles. Learn how to overcome setbacks.",
    "aboutAuthor": "Luke Richmond is an Aussie adventurer who has conquered the odds during many internationally acclaimed expeditions. Luke's lifelong passion is to make adventure accessible to everyone and to inspire others to feel the reward of conquering a physical and mental challenge"
  },
  {
    "_id": "5f7fe73a-c4f2-4d58-b4ad-ec88426e26be",
    "title": "Rich Dad Poor Dad",
    "rating": 4.7,
    "authorName": "Robert Kiyosaki",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/rich-dad-poor-dad-book.png",
    "aboutBook": "Rich Dad Poor Dad is about Robert Kiyosaki and his two dads, his real father and the father of his best friend and the ways in which both men shaped his thoughts about money and investing. You do not need to earn a high income to be rich. Rich people make money work for them.",
    "aboutAuthor": "Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter. It advocates the importance of financial literacy, financial independence and building wealth through investing in assets, real estate investing, as well as increasing financial intelligence."
  },
  {
    "_id": "d62be471-cd9b-4b1f-ad21-ab81ac370a06",
    "title": "The Secret Messenger",
    "rating": 4.2,
    "authorName": "Mandy Robotham",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-secret-messenger-book.png",
    "aboutBook": "The Secret Messenger is a book about the resistance during WWII in Venice Italy. It follows a story of a Luisa who finds an old typewriter in the attic and inside is a picture of her grandmother. She goes to Venice on a quest to find out about the history of her grandmother during WWII.",
    "aboutAuthor": "Mandy Robotham is a Globe and Mail, USA Today, and Canadian, US and Australian Kindle Top 100 bestseller. She has been an aspiring author from the age of nine, but was waylaid by journalism and later enticed by birth."
  },
  {
    "_id": "5f1e9de9-5360-4a76-bed7-2c03b1618a6a",
    "title": "I Can And I Will",
    "rating": 3.5,
    "authorName": "Rick Stanfield",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/i-can-and-i-will-book.png",
    "aboutBook": "Life is an opportunity to evolve to higher degrees of consciousness. It is also an opportunity to become a change agent for helping people to live a better quality of life. Becoming a change agent is likely to happen through our transformation and not through our suggestions or advice.",
    "aboutAuthor": "Rick Stanfield is a former Missouri State Trooper and entrepreneur who cofounded Sweet Henrietta Treats in Santa Rosa Beach, Florida."
  },
  {
    "_id": "1ef1dcc0-32a4-4a73-a598-4643ea919a5f",
    "title": "1984",
    "rating": 4.5,
    "authorName": "George Orwell",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/george-orwell-1984-book.png",
    "aboutBook": "1984 is a dystopian novella by George Orwell published in 1949, which follows the life of Winston Smith, a low ranking member of the Party, who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother.",
    "aboutAuthor": "1984, a novel by English author George Orwell published in 1949 as a warning against totalitarianism. The chilling dystopia made a deep impression on readers, and his ideas entered mainstream culture in a way achieved by very few books."
  },
  {
    "_id": "19cef045-ef9b-4898-a9e9-dc943e44da5e",
    "title": "Atomic Habits",
    "rating": 4.7,
    "authorName": "James Clear",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/atomic-habits-book.png",
    "aboutBook": "Atomic Habits states that big goals should not be the main focus of peoples lives. It encourages readers to utilize frequent and repetitive actions and systems to help form invaluable habits that last lifelong.",
    "aboutAuthor": "He is the author of the 1 New York Times bestseller, Atomic Habits. The book has sold over 5 million copies worldwide and has been translated into more than 50 languages."
  },
  {
    "_id": "a94bf1b1-b49e-4ba2-8d41-3625cf6cee09",
    "title": "The Beginning of Everything",
    "rating": 4.5,
    "authorName": "Robyn Schneider",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-beginning-of-everything-book.png",
    "aboutBook": "The author, Robyn Schneider, tells the story of a typical high school jock Ezra, who experiences his own personal tragedy of a cheating girlfriend and a car crash that leaves his leg shattered and his sporting dreams in pieces",
    "aboutAuthor": "Robyn Schneider grew up in Southern California, where she spent her childhood reading fantasy novels and searching for secret passages. She is a graduate of Columbia University, where she studied creative writing and the University of Pennsylvania Perelman School of Medicine."
  },
  {
    "_id": "e9f49279-5cf7-4167-a9d7-554cd0adbec3",
    "title": "Between The Deep Blue Sea And Me",
    "rating": 4.5,
    "authorName": "Lurline Wailana McGregor",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/between-the-blue-sea-and-me-book.png",
    "aboutBook": "Dealing with the themes of family and culture, this story touches on both while leaving the reader wanting to explore their own culture and history.",
    "aboutAuthor": "Moana Kawelo, PhD, has a promising career as a museum curator in Los Angeles. The untimely death of her father and the gravitational pull of Hawaii when she returns home for his funeral causes Moana to question her motivations and her glamorous life in California."
  },
  {
    "_id": "0439de13-33a2-4303-af0c-088db339a67e",
    "title": "How successful people Think",
    "rating": 4.5,
    "authorName": "John C. Maxwell",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/how-successful-people-think-book.png",
    "aboutBook": "HOW SUCCESSFUL PEOPLE THINK is the perfect, compact read for today's fast-paced world. America's leadership expert John C. Maxwell will teach you how to be more creative and when to question popular thinking. You'll learn how to capture the big picture while focusing your thinking.",
    "aboutAuthor": "John Calvin Maxwell is an American author, speaker, and pastor who has written many books, primarily focusing on leadership. Titles include The 21 Irrefutable Laws of Leadership and The 21 Indispensable Qualities of a Leader."
  },
  {
    "_id": "1055f585-559b-4fe6-b9b0-d100b52b0389",
    "title": "The Tempest",
    "rating": 4.2,
    "authorName": "Willam Shakespeare",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-tempest-book.png",
    "aboutBook": "The Tempest is a play by English playwright William Shakespeare, probably written in 1610 to 1611, and thought to be one of the last plays that Shakespeare wrote alone. The play contains music and songs that evoke the spirit of enchantment on the island.",
    "aboutAuthor": "Penned by the world's greatest dramatist, William Shakespeare, The Tempest introduced the concept of tragicomedy to drama literature. The play is set on a remote island, where Prospero, the rightful Duke of Milan and his daughter Miranda reside for the past 12 years."
  },
  {
    "_id": "b25ba3f7-d91b-4641-86fe-2aa47f3ca365",
    "title": "Books To Die For",
    "rating": 4.2,
    "authorName": "Declan Burke",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/books-to-die-for-book.png",
    "aboutBook": "The perfect blend of literary fiction and mystery, To Die For is a book about fidelity, sexual obsession, ambition, violence and the role that pop culture plays in society's desire for gratification, self-fulfilment, and ultimately, love.",
    "aboutAuthor": "The world's most beloved mystery writers celebrate their favourite mystery novels in this gorgeously wrought collection, featuring essays by Michael Connelly, Kathy Reichs, Ian Rankin, and more."
  },
  {
    "_id": "608a7ea5-9d5b-4eca-af3b-c0dec923f36b",
    "title": "The Name of the Wind",
    "rating": 4.5,
    "authorName": "Patrick Rothfuss",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-name-of-the-wind-book.png",
    "aboutBook": "The tale of Kvothe, from his childhood in a troupe of travelling players, to years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a difficult and dangerous school of magic.",
    "aboutAuthor": "Patrick Rothfuss is the bestselling author of The Kingkiller Chronicle. His first novel, The Name of the Wind, won the Quill Award and was a Publishers Weekly Best Book of the Year."
  },
  {
    "_id": "bd665146-89bb-41f5-b876-37948311b3fd",
    "title": "The Book of Life",
    "rating": 3.5,
    "authorName": "Deborah Harkness",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/the-book-of-life-book.png",
    "aboutBook": "Inspired by Krishnamurti S belief that truth is gound through living, The Book Of Life Presents 365 timeless daily meditations, developed thematically over seven days, illuminating the concepts of freedom, personal transformation, living fully awake and much more.",
    "aboutAuthor": "Deborah Harkness is an American scholar, novelist and wine enthusiast, best known as a historian and as the author of the All Souls Trilogy, which consists of The New York Times best-selling novel A Discovery of Witches and its sequels Shadow of Night and The Book of Life."
  },
  {
    "_id": "7850622e-1b70-4396-963d-e68d5a2577d7",
    "title": "Eyes to the Wind",
    "rating": 4.9,
    "authorName": "Ady Barkan",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/eyes-to-the-wind-book.png",
    "aboutBook": "Eyes to the Wind is a rousing memoir featuring intertwining storylines about determination, perseverance, and how to live a life filled with purpose and intention.",
    "aboutAuthor": "Ady Barkan is an American lawyer and liberal activist. He is a co-founder of the Be a Hero PAC and is an organizer for the Center for Popular Democracy, where he led the Fed Up campaign.",
    "updatedAt": "2026-09-04T08:18:00.425Z"
  },
  {
    "_id": "20744513-efa5-4a58-85c2-eee3bc4d5a17",
    "title": "In To The Dark",
    "rating": 4.2,
    "authorName": "Claudia Gray",
    "coverPic": "https://assets.ccbp.in/frontend/react-js/in-to-the-dark-book.png",
    "aboutBook": "Deaf from birth, he is always looked out for his five-year-old brother, Joshua. When his stepfather comes after Joshua, Michael takes the child and runs. He is determined to protect his brother at all costs, even if that means making himself vulnerable to a danger he can not hear coming.",
    "aboutAuthor": "Claudia Gray is the pseudonym of Amy Vincent, an American writer of paranormal romance young adult fiction, best known for the Evernight series"
  }
];

module.exports = oldBooks;
