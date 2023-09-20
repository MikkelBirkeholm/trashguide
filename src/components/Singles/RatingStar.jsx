export const RatingStar = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25.645"
        height="25.808"
        viewBox="0 0 25.645 25.808"
      >
        <g
          id="vuesax_bold_magic-star"
          data-name="vuesax/bold/magic-star"
          transform="translate(0 0)"
        >
          <g id="magic-star">
            <path
              id="Vector"
              d="M0,0H23.456V23.456H0Z"
              transform="translate(0.32 0.337)"
              fill="none"
              opacity="0"
            />
            <path
              id="Vector-2"
              data-name="Vector"
              d="M14.844,2.092l-.068,3.7A2.033,2.033,0,0,0,15.5,7.281l2.424,1.837c1.554,1.173,1.3,2.609-.557,3.2l-3.157.987a2.037,2.037,0,0,0-1.222,1.28l-.753,2.873c-.6,2.267-2.082,2.492-3.313.5L7.2,15.168a2.012,2.012,0,0,0-1.642-.86L2.3,14.474c-2.336.117-3-1.231-1.476-3.01L2.755,9.216a2.034,2.034,0,0,0,.362-1.73l-1-3.167c-.577-1.857.459-2.883,2.306-2.277l2.883.948a2.039,2.039,0,0,0,1.632-.254l3.01-2.17C13.584-.6,14.883.088,14.844,2.092Z"
              transform="translate(0 8.599) rotate(-27)"
              fill={filled ? '#FFA500' : '#d9d9d9'}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
