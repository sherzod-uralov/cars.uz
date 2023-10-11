import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GET_CATEGORY = gql`
  query Category {
    category {
      category_id
      category_image
      category_name
      models {
        category_id
        color
        distance
        engine
        gearbook
        inside_image
        model_id
        model_type_image
        name
        outside_image
        price
        toning
        year
      }
    }
  }
`;

function Category() {
  console.log(useLocation().pathname);
  const { loading, error, data } = useQuery(GET_CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {}, [data]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const text = 'bosh sahifa > categoriya';

  return (
    <div className='category_bg'>
      <div className='container'>
        <div className='category'>
          <div className='category_nav'>
            <p>{text}</p>
            <button>Admin o‘tish</button>
          </div>
          <Slider
  dots={true}
  infinite={true}
  speed={400}
  slidesToShow={4
  }
  slidesToScroll={1}
  autoplay={true}
  autoplaySpeed={2000}
  navigation={{ nextEl: null, prevEl: null }}
  pagination={{ clickable: true }}
>
            {data?.category?.map((category) => (
              <div className='category_card' key={category.category_id} onClick={() => handleCategoryClick(category)}>
                <img src={`http://localhost:4700/uploads/${category.category_image}`} alt="avto" />
                <h3> {category.category_name}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Category;
