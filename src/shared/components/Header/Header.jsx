export default function Header({title , description , imgUrl}) {
  return (
    <>
      <header className="bg-success text-white rounded-4 mb-4 mx-3 ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 ">
              <div className=" h-100 d-flex flex-column justify-content-center p-2">
                <h4>{title}</h4>
                <p className="text-white">
                {description}
                </p>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="h-100 text-end ">
                <img className="w-40" src={imgUrl} alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
