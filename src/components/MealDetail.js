import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import arrowLeft from '../asset/arrowLeft.svg';
import { getMealsDetails } from '../redux/Details/DetailSlice';
import '../modules/MealDetail.css';

const MealsDetails = () => {
  const { loading, error, mealsDetail } = useSelector((state) => state.mealsDetail);
  const dispatch = useDispatch();
  console.log(mealsDetail);
  const mealInfo = {
    id: mealsDetail.id,
    image: mealsDetail.images,
    title: mealsDetail.title,
    nutrients: mealsDetail.nutrient,
  };

  useEffect(() => {
    // Check if there's an error in mealsDetail before dispatching the action.
    if (mealsDetail.error) {
      dispatch(getMealsDetails(mealsDetail.id));
    }
  }, [dispatch, mealsDetail.id, mealsDetail.error]);
  return (
    <div>
      <Link to="/">
        <button type="button" className="arrow-left-btn">
          <img src={arrowLeft} alt="arrow left" />
        </button>
      </Link>
      <div>
        {loading && <p>Loading!</p>}
        {error && <p>Error...</p>}
        {!loading && !error && mealsDetail
            && (
            <div key={mealInfo?.id} id={mealInfo?.id} className="meals-detail-content">
              {mealInfo.image === undefined ? (<p style={{ color: 'white', fontSize: '20px' }}>No image</p>)
                : (<img src={mealInfo.image} alt="meals" style={{ width: '200px' }} />)}
              <p style={{ color: 'white', fontFamily: 'Roboto', fontSize: '20px' }}>{mealInfo.title}</p>
              <table>
                <thead>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Unit</th>
                  <th>PercentOfDailyNeeds</th>
                </thead>
              </table>

              {mealsDetail.nutrient ? (
                mealsDetail.nutrient.map((nutrient) => (
                  <table key={nutrient.id}>
                    <tbody>
                      <td>{nutrient.name}</td>
                      <td>{nutrient.amount}</td>
                      <td>{nutrient.unit}</td>
                      <td>{nutrient.percentOfDailyNeeds}</td>
                    </tbody>

                  </table>
                ))
              ) : (
                <p style={{ color: 'white' }}>No nutrients available</p>
              )}
            </div>
            )}
      </div>
    </div>

  );
};

export default MealsDetails;
