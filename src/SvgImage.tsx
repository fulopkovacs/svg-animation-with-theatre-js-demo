import React from "react";
import { SvgImageProps } from ".";

const SvgImage = React.forwardRef<SVGSVGElement, SvgImageProps>(
  (props, ref) => (
    <svg
      onMouseUp={props.handleMouseUp}
      onMouseMove={props.handleMouseMove}
      width="100%"
      height="100%"
      viewBox={props.viewBox.join(" ")}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className="bot"
      ref={ref}
    >
      <g
        id="Bot-2"
        transform-origin={`${props.botCharacter.transformOrigin.x} ${props.botCharacter.transformOrigin.y}`}
        transform={`rotate(${props.botCharacter.rotation}) translate(${props.botCharacter.translate.x}, ${props.botCharacter.translate.y})`}
      >
        <path
          id="Body"
          transform-origin={`${props.body.transformOrigin.x} ${props.body.transformOrigin.y}`}
          transform={`rotate(${props.body.rotation}) translate(${props.body.translate.x}, ${props.body.translate.y})`}
          d="M95.281,308.864C112.687,300.838 169.126,302.51 202.858,302.51C220.096,302.51 319.017,302.321 329.38,312.688C337.053,320.365 320.504,381.294 317.48,390.546C311.127,409.982 297.088,466.256 290.779,485.609C286.01,500.234 280.842,522.496 271.233,531.391C260.099,541.698 228.117,538.859 214.162,538.859C159.927,538.859 156.571,536.671 136.383,486.398C123.468,454.238 110.662,423.958 102.394,390.884C97.121,369.792 84.242,313.954 95.281,308.864Z"
        />
        <g id="Arm_left">
          {props.armLeft.path}
          {props.armLeft.control}
        </g>
        <g id="Arm_right">
          {props.armRight.path}
          {props.armRight.control}
        </g>
        <g
          id="Head"
          transform-origin={`${props.head.transformOrigin.x} ${props.head.transformOrigin.y}`}
          transform={`rotate(${props.head.rotation}) translate(${props.head.translate.x}, ${props.head.translate.y})`}
        >
          <path d="M110.994,68.4C90.94,81.474 75.069,215.28 85.908,235.147C93.681,249.394 172.618,255.898 215.61,258.697C258.329,261.478 328.589,266.666 343.861,251.942C356.046,240.194 359.715,146.826 349.225,117.985C341.794,97.553 130.235,55.857 110.994,68.4Z" />
          <g id="Eye_right">
            {props.eyeRight.path}
            {props.eyeRight.control}
          </g>
          <g id="Eye_left">
            {props.eyeLeft.path}
            {props.eyeLeft.control}
          </g>
          <path
            id="Mouth"
            d="M173.278,190.391L188.841,215.106L212.883,198.529"
          />
          <path d="M108.909,69.541C112.574,66.668 103.407,27.881 92.252,21.039" />
          <circle cx="92.252" cy="21.039" r="17.127" />
          <circle cx="365.944" cy="74.382" r="17.127" />
          <path d="M343.751,111.887C348.645,91.141 354.951,88.364 365.944,74.382" />
        </g>
        <g id="Neck">
          {props.neck.path}
          {props.neck.control}
        </g>
      </g>
      <ellipse id="Shadow" cx={props.shadow.cx} cy={props.shadow.cy} rx={props.shadow.rx} ry={props.shadow.ry} />
    </svg>
  )
);

export default SvgImage;
