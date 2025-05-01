return (
  <div className="animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Book Cover */}
      <div className="md:col-span-1">
        <div className="book-cover aspect-[2/3] max-w-xs mx-auto">
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-6 flex justify-center space-x-3">
          <Button variant="outline" className="bg-white flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5" />
            <span>Save</span>
          </Button>
          <Button className="bg-cozy-amber text-black hover:bg-cozy-amber/80 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span>Read Now</span>
          </Button>
        </div>
      </div>

      {/* Book Details */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cozy-brown mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600">by {book.author}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {book.genre.map((genre, index) => (
              <Badge key={index} variant="outline" className="bg-cozy-beige text-cozy-brown border-cozy-brown/30">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="font-serif text-xl font-semibold mb-4 text-cozy-brown">About this book</h2>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-cozy-beige/50 p-4 rounded-lg">
            <h3 className="font-medium text-cozy-brown mb-2">Details</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Publisher</span>
                <span className="font-medium">{book.publisher}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Publication Date</span>
                <span className="font-medium">{book.publicationDate}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Pages</span>
                <span className="font-medium">{book.pages}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">ISBN</span>
                <span className="font-medium">{book.isbn}</span>
              </li>
            </ul>
          </div>

          <div className="bg-cozy-sage/30 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BookMarked className="h-5 w-5 text-cozy-brown mr-2" />
              <h3 className="font-medium text-cozy-brown">Reader's Notes</h3>
            </div>
            <p className="text-sm text-gray-600 italic">
              "A cozy reading companion for those quiet evenings with a cup of tea."
            </p>
            <div className="mt-3 text-sm text-right text-cozy-terracotta">- CozyReads Editor</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
