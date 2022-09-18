import React from 'react'
import { Col, Row } from 'react-bootstrap'
import StoreItem from '../components/StoreItem'
import storeItems from './../data/items.json'

function Store() {
  return (
    <>
      <h1>Store</h1>
      
      {/* middle size -> 2 cols, extra-small... // gap-3  */}
      <Row lg={3} md={2} xs={1} className='g-3'> 
        {storeItems.map(item => (
          <Col key={item.id}> <StoreItem {...item} /> </Col>
        ))}
      </Row>
    </>

  )
}

export default Store