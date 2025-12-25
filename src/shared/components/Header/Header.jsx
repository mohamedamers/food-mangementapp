import backgroundImge from "../../../assets/images/background.jpeg"

export default function Header({title , description , imgUrl}) {
  return (
    <header 
      className="text-white rounded-4 mb-4 mx-3" 
      style={{
        backgroundImage: `url(${backgroundImge})`,
        backgroundSize: 'cover',      
        backgroundPosition: 'center',  
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="h-100 d-flex flex-column justify-content-center p-4">
              <h4>{title}</h4>
              <p className="text-white">
                {description}
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="h-100 text-end p-2">
              <img className="w-40" src={imgUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}