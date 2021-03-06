import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import PlaceList from '../../components/place-list/place-list';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import { reviews } from '../../mocks/reviews';
import { Offer } from '../../types/mainTypes';

interface OffersProps {
  offers: Offer[],
}

export default function Property({offers}: OffersProps): JSX.Element {
  const {id} = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const currentOffer: Offer = getCurrentOffer(id || '', offers);
  const {images, bedrooms, description, goods, host:{isPro, avatarUrl, name}, isPremium, maxAdults, price, rating, title, type} = currentOffer;
  const imagesToRender = images.slice(0, 5);
  const reccomendedOffers: Offer[] = offers.filter((item) => item.id !== (id && +id));

  function getCurrentOffer(pageId: string, allOffers:Offer[]): Offer {
    return allOffers.find((el:Offer) => el.id === +pageId) || allOffers[0];
  }

  return (
    <React.Fragment>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {imagesToRender.map((image) => (
                  <div key={image} className="property__image-wrapper">
                    <img className="property__image" src={image} alt={type} />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  isPremium ?
                    <div className="property__mark">
                      <span>Premium</span>
                    </div> : null
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <Rating rating={rating}
                  classPrefix='property'
                  isRatingValue
                />
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      goods.map((item) => (
                        <li key={item} className="property__inside-item">
                          {item}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host" />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                    {isPro && <span className="property__user-status">Pro</span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <Reviews reviews={reviews}/>
              </div>
            </div>
            <section className="property__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <PlaceList placesList={reccomendedOffers} classPrefix='near-places'/>
            </section>
          </div>
        </main>
      </div>``
    </React.Fragment>
  );
}
