const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img 
          src={item.image || item.thumbnail || 'https://via.placeholder.com/300'} 
          className="card-img-top" 
          alt={item.name || item.title}
          style={{height: '200px', objectFit: 'cover'}}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name || item.title}</h5>
          <p className="card-text">{item.description || item.status || 'No description'}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
