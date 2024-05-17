import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae sint dicta repellat nemo! Nisi, vitae ad facere sit aspernatur omnis officia minima ab veniam, cumque iure laborum doloremque sint aliquid?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime incidunt perspiciatis suscipit iusto nostrum est ratione blanditiis! Voluptatem, vitae, blanditiis doloremque neque consequatur harum, unde odit quia suscipit ipsum explicabo.</p>
        </div>
    </div>
  )
}

export default DescriptionBox