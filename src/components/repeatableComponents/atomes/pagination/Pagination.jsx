import "./pagination.css";
import left from "../../../../assets/icons/left.png"
import right from "../../../../assets/icons/right.png"
// export const Pagination = ({ totalPages, currentPage, onPageChange, prevPageUrl, nextPageUrl, handlePrevClick, handleNextClick }) => {
  
//     const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
//     return (
//       <div className="pagination">
//         <img src={left} alt="Previous"  className="pagination-arrowLeft" onClick={handlePrevClick}  style={{
//             opacity: prevPageUrl ? 1 : 0.5, 
//             pointerEvents: prevPageUrl ? 'auto' : 'none' 
//           }}/>
  
//         {pageNumbers.map((number) => (
//           <button
//             key={number}
//             className={`pagination-number ${currentPage === number ? 'active' : ''}`}
//             onClick={() => onPageChange(number)}
//           >
//             {number}
//           </button>
//         ))}
  
//         <img src={right} alt="Next" className="pagination-arrow" onClick={handleNextClick}  style={{
//             opacity: nextPageUrl ? 1 : 0.5, 
//             pointerEvents: nextPageUrl ? 'auto' : 'none' 
//           }}/>
//       </div>
//     );
//   };
export const Pagination = ({
    totalPages,
    currentPage,
    onPageChange,
    prevPageUrl,
    nextPageUrl,
    handlePrevClick,
    handleNextClick,
  }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <div className="pagination">
        {/* Flèche gauche */}
        <img
          src={left}
          alt="Previous"
          className="pagination-arrowLeft"
          onClick={handlePrevClick}
          style={{
            opacity: prevPageUrl ? 1 : 0.5,
            pointerEvents: prevPageUrl ? "auto" : "none",
          }}
        />
  
        {/* Nombres des pages */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`pagination-number ${currentPage === number ? "active" : ""}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
  
        {/* Flèche droite */}
        <img
          src={right}
          alt="Next"
          className="pagination-arrow"
          onClick={handleNextClick}
          style={{
            opacity: nextPageUrl ? 1 : 0.5,
            pointerEvents: nextPageUrl ? "auto" : "none",
          }}
        />
      </div>
    );
  };
  