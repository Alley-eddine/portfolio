"use client"

import { useInView, useAnimationFrame } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { AnimatedSection } from "./animated-section"

interface TechItem {
  name: string
  icon: React.ReactNode
  color: string
}

interface SkillCategory {
  title: string
  label: string
  items: TechItem[]
}

/* ---- SVG Icons ---- */

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#61DAFB">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.7V41.8h7.5v42.8z" className="fill-foreground" />
    </svg>
  )
}

function VueIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path fill="#42b883" d="M78.8 10L64 35.4 49.2 10H0l64 110L128 10z" />
      <path fill="#35495e" d="M78.8 10L64 35.4 49.2 10H25.6L64 76.2 102.4 10z" />
    </svg>
  )
}

function AstroIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path className="fill-foreground" d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90.079 90.079 0 0 0-25.89-8.765L65.629 30.28a1.833 1.833 0 0 0-3.52.004L48.18 77.902a90.104 90.104 0 0 0-26.003 8.79l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8.023 8.023 0 0 1 3.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a7.988 7.988 0 0 1 3.242 2.39Z" />
      <path fill="#FF5D01" d="M84.094 90.074c-3.57 3.054-10.696 5.137-18.903 5.137-10.07 0-18.515-3.137-20.754-7.356-.8 2.418-.98 5.184-.98 6.954 0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.726 8.543 12.805a14.266 14.266 0 0 1-1.973-7.304c0-7.008 4.109-9.617 8.984-12.7 3.879-2.452 8.25-5.216 11.094-10.836a23.118 23.118 0 0 0 2.504-10.582 23.512 23.512 0 0 0-5.058 6.02Z" />
    </svg>
  )
}

function TypeScriptIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path fill="#3178c6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23.91 23.91 0 0180 107.19a25.92 25.92 0 01-3.56-5.29l4.27-2.45 3.29-1.9 1.07 1.63a15.54 15.54 0 005.51 5.16c4.53 2.2 10.76 1.88 13.81-.68a5.26 5.26 0 001.61-4.6c-.31-1.92-1.53-3-6.35-5.23-5.49-2.52-7.86-4.07-10.22-6.66a17.09 17.09 0 01-3.25-6.65 27.71 27.71 0 01-.26-7.75c1.05-5.72 5.13-10.27 10.84-12.06a26.83 26.83 0 019.45-.73zm-29.65 5.93H57v49.25H45.76V64.84H33.26v-8.89h39.82z" />
    </svg>
  )
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z" fill="#38bdf8" />
    </svg>
  )
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623c-.712 0-2.306 1.061-2.306 1.773v50.49c0 3.896-3.524 7.773-10.11 4.482L18.723 90.73c-.424-.264-.675-.738-.675-1.283V38.407c0-.544.31-1.06.737-1.325l44.047-25.559c.383-.238.946-.238 1.35 0l43.948 25.559c.442.266.803.781.803 1.325v51.142c0 .544-.321 1.066-.757 1.333l-43.948 25.559c-.383.217-.918.217-1.35 0l-11.406-6.761c-.331-.191-.758-.234-1.073-.044-3.792 2.175-4.516 2.443-8.05 3.696-.87.31-2.171.816.474 2.315l14.88 8.816c1.398.82 3.012 1.268 4.66 1.268 1.627 0 3.231-.448 4.607-1.268l44.049-25.559c2.871-1.66 4.907-4.764 4.907-8.083V38.407c0-3.319-2.036-6.422-4.907-8.073" />
    </svg>
  )
}

function ExpressIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path className="fill-foreground" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.22 3.71l26.5-33.63-25.72-32.88c4.56-.77 7.63-.37 10.14 3.54 5.21 8.11 11 15.82 16.83 24.07 5.93-8.35 11.65-16.12 17-24.18 2.45-3.68 5.15-4.45 9.34-3.43L95.9 64.74l26.77 33.7z" />
      <path className="fill-foreground" d="M1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z" />
    </svg>
  )
}

function LaravelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#FF2D20">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934c0 .135-.073.26-.188.326l-9.006 5.19a.32.32 0 01-.066.028.288.288 0 01-.05.01.39.39 0 01-.076 0l-.052-.012a.277.277 0 01-.06-.026L.534 18.755a.376.376 0 01-.189-.326V3.334c0-.034.005-.069.014-.1l.006-.024a.3.3 0 01.023-.06l.014-.027a.357.357 0 01.033-.05l.022-.024c.013-.013.028-.026.043-.036l.025-.018a.361.361 0 01.053-.028L5.07.762a.371.371 0 01.378 0l4.49 2.59a.366.366 0 01.05.028l.025.018c.015.01.03.023.043.036l.022.024c.013.016.023.032.033.05l.014.027a.299.299 0 01.023.06l.006.024c.01.031.014.066.014.1v9.652l3.76-2.164V5.527c0-.034.005-.069.014-.1l.006-.023a.307.307 0 01.023-.061l.014-.027a.35.35 0 01.033-.05l.022-.024.043-.036.025-.018a.361.361 0 01.053-.028l4.49-2.59a.375.375 0 01.379 0l4.49 2.59c.019.01.036.02.053.028l.025.018.043.036.022.024c.013.016.023.032.033.05l.014.027a.3.3 0 01.023.06z" />
    </svg>
  )
}

function MongoDBIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#47A248">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
    </svg>
  )
}

function PostgreSQLIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.545-56.287-14.47-18.489-39.478-9.749-39.478-9.749l-.135.024c-2.751-.571-5.83-.912-9.289-.968-6.301-.104-11.082 1.652-14.535 4.401 0 0-44.096-18.162-42.046 22.86.437 8.712 12.556 65.912 27.015 48.638 5.282-6.307 10.391-11.636 10.391-11.636 2.537 1.688 5.574 2.553 8.803 2.24l.249-.212c-.078.796-.044 1.575.098 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69.208 5.214.666 10.126 2.065 13.01 1.399 2.884 3.092 9.894 16.299 7.855 11.043-1.703 16.738-6.136 17.563-13.545.587-5.273 1.917-4.492 2.005-9.199l1.07-3.017c1.228-9.413-.168-12.444 7.264-11.026l1.72.274z" fill="#336791" />
    </svg>
  )
}

function RedisIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path fill="#D82C20" d="M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.5-7.4 3.8-11.5 3.8-17.3 1S13 98.1 6.3 94.9c-3.3-1.6-5-2.9-5-4.2V78s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s45.1 9.3 48.3 10.5v12.8c0 1.2-1.3 2.6-5.3 4.2" />
      <path fill="#D82C20" d="M121.8 80.5C115.1 84 80.4 98.2 73 102c-7.4 3.8-11.5 3.8-17.3 1S13 85.4 6.3 82.3C-.1 79.8-2.2 77.5 6.3 74.1c8.5-3.3 42.4-16.5 50.2-19.3 7.8-2.8 10.4-2.9 17-.5 6.6 2.4 40.8 15.7 48.3 18.4 7.5 2.7 6.7 4.4 0 7.8" />
      <path fill="#A41E11" d="M121.8 72.5c-6.7 3.5-41.4 17.7-48.8 21.5-7.4 3.8-11.5 3.8-17.3 1S13 77.4 6.3 74.3c-3.3-1.6-5-2.9-5-4.2V57.3s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s45.1 9.3 48.3 10.5v12.8c0 1.2-1.3 2.6-5.3 4.2" />
      <path fill="#D82C20" d="M121.8 59.8c-6.7 3.5-41.4 17.7-48.8 21.5-7.4 3.8-11.5 3.8-17.3 1S13 64.8 6.3 61.6C-.1 59.1-2.2 56.8 6.3 53.4c8.5-3.3 42.4-16.5 50.2-19.3 7.8-2.8 10.4-2.9 17-.5 6.6 2.4 40.8 15.7 48.3 18.4 7.5 2.7 6.7 4.4 0 7.8" />
    </svg>
  )
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path fillRule="evenodd" clipRule="evenodd" className="fill-foreground" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
    </svg>
  )
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path className="fill-foreground" d="M64 0L128 110.848H0L64 0z" />
    </svg>
  )
}

function CloudflareIcon() {
  return (
    <svg viewBox="0 0 128 128" className="h-7 w-7">
      <path fill="#F48120" d="M100.504 91.598l3.66-12.762c.625-2.302.384-4.423-.68-5.966-1.004-1.459-2.701-2.332-4.782-2.466l-51.58-.716c-.22-.03-.4-.134-.508-.283-.114-.16-.14-.357-.074-.537.074-.211.268-.37.508-.423l52.045-.72c4.803-.236 10.01-4.174 11.8-8.916l2.27-6.021c.16-.402.195-.803.114-1.181C110.54 37.9 97.867 27.2 82.61 27.2c-13.66 0-25.302 8.524-30.024 20.564-2.733-2.054-6.23-3.165-10.013-2.716-6.56.78-11.808 6.14-12.456 12.725-.134 1.363-.064 2.696.183 3.96C19.91 62.413 11.2 71.368 11.2 82.232c0 1.165.099 2.306.278 3.42.118.696.72 1.2 1.42 1.2h85.54c.625 0 1.18-.399 1.38-.988l.686-2.266z" />
      <path fill="#FAAD3F" d="M112.524 62.156h-1.548c-.134 0-.253.082-.3.204l-2.14 7.46c-.626 2.302-.385 4.423.68 5.965 1.003 1.46 2.7 2.333 4.782 2.467l6.024.717c.22.03.4.133.508.283.114.16.14.357.074.536-.074.212-.268.371-.508.424l-6.458.716c-4.85.268-10.01 4.175-11.8 8.917l-.625 1.64c-.094.254.087.514.358.514h18.3c.636 0 1.198-.416 1.38-1.015A21.55 21.55 0 00123.2 83.7c0-11.93-9.648-21.544-21.477-21.544h.801z" />
    </svg>
  )
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 109 113" className="h-7 w-7">
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.15 54.347Z" fill="url(#supa-a)" />
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.15 54.347Z" fill="url(#supa-b)" fillOpacity=".2" />
      <path d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z" fill="#3ECF8E" />
      <defs>
        <linearGradient id="supa-a" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient id="supa-b" x1="36.156" y1="30.578" x2="54.484" y2="65.081" gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function KeystaticIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" className="fill-card stroke-foreground/20" strokeWidth="1" />
      <path d="M8 7v10M8 12h4l3-5M12 12l3 5" stroke="#F9D72C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PayloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <path d="M11 3L21 8.5V18L11 23.5V13.5L1 8.5L11 3Z" className="fill-foreground" />
      <path d="M11 13.5L21 8.5" className="stroke-background" strokeWidth="1.5" />
      <path d="M11 23.5V13.5" className="stroke-background" strokeWidth="1.5" />
    </svg>
  )
}

/* ---- Data ---- */

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    label: "</>",
    items: [
      { name: "React", icon: <ReactIcon />, color: "#61DAFB" },
      { name: "Next.js", icon: <NextIcon />, color: "#ebebeb" },
      { name: "Vue.js", icon: <VueIcon />, color: "#42b883" },
      { name: "Astro", icon: <AstroIcon />, color: "#FF5D01" },
      { name: "TypeScript", icon: <TypeScriptIcon />, color: "#3178c6" },
      { name: "Tailwind", icon: <TailwindIcon />, color: "#38bdf8" },
    ],
  },
  {
    title: "Backend",
    label: "{ }",
    items: [
      { name: "Node.js", icon: <NodeIcon />, color: "#83CD29" },
      { name: "Express", icon: <ExpressIcon />, color: "#ebebeb" },
      { name: "Laravel", icon: <LaravelIcon />, color: "#FF2D20" },
      { name: "Payload CMS", icon: <PayloadIcon />, color: "#ebebeb" },
      { name: "Keystatic", icon: <KeystaticIcon />, color: "#F9D72C" },
    ],
  },
  {
    title: "Base de donnees",
    label: "DB",
    items: [
      { name: "MongoDB", icon: <MongoDBIcon />, color: "#45A538" },
      { name: "PostgreSQL", icon: <PostgreSQLIcon />, color: "#336791" },
      { name: "Redis", icon: <RedisIcon />, color: "#D82C20" },
      { name: "Supabase", icon: <SupabaseIcon />, color: "#3ECF8E" },
    ],
  },
  {
    title: "DevOps & Deploy",
    label: ">>",
    items: [
      { name: "Docker", icon: <DockerIcon />, color: "#00AADA" },
      { name: "GitHub", icon: <GitHubIcon />, color: "#ebebeb" },
      { name: "Vercel", icon: <VercelIcon />, color: "#ebebeb" },
      { name: "Cloudflare", icon: <CloudflareIcon />, color: "#F48120" },
    ],
  },
]

/* ---- Filter tabs ---- */

const filters = [
  { key: "all", label: "Tout" },
  ...skillCategories.map((c) => ({ key: c.title, label: c.title })),
]

function getFilteredItems(filterKey: string): TechItem[] {
  if (filterKey === "all") return skillCategories.flatMap((c) => c.items)
  return skillCategories.find((c) => c.title === filterKey)?.items ?? []
}

/* ---- Orbital carousel ---- */

function OrbitalCarousel({ items }: { items: TechItem[] }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const itemEls = useRef<(HTMLDivElement | null)[]>([])
  const rotationRef = useRef(0)
  const isPausedRef = useRef(false)
  const hoveredRef = useRef<number | null>(null)
  const entranceRef = useRef(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const sentinelRef = useRef(null)
  const isInView = useInView(sentinelRef, { once: true, margin: "-80px" })

  const countRef = useRef(items.length)
  const radiusXRef = useRef(350)

  /* Reset entrance on filter change */
  useEffect(() => {
    countRef.current = items.length
    entranceRef.current = 0
    hoveredRef.current = null
    isPausedRef.current = false
  }, [items])

  /* Responsive radius */
  useEffect(() => {
    function update() {
      if (sceneRef.current) {
        const w = sceneRef.current.offsetWidth
        radiusXRef.current = Math.min(400, w * 0.42)
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  /* 60fps animation loop */
  useAnimationFrame((_time, delta) => {
    if (!isInView) return

    const count = countRef.current

    if (entranceRef.current < 1) {
      entranceRef.current = Math.min(1, entranceRef.current + delta * 0.0007)
    }

    if (!isPausedRef.current) {
      rotationRef.current += delta * 0.00025
    }

    const radiusX = radiusXRef.current
    const depthY = 55
    const hovered = hoveredRef.current

    for (let i = 0; i < count; i++) {
      const el = itemEls.current[i]
      if (!el) continue

      const angle = ((2 * Math.PI) / count) * i + rotationRef.current
      const sinA = Math.sin(angle)
      const cosA = Math.cos(angle)

      const x = sinA * radiusX
      const y = -cosA * depthY
      const depth = (cosA + 1) / 2

      let scale = 0.5 + 0.5 * depth
      let opacity = 0.2 + 0.8 * depth
      let zIndex = Math.round(depth * 100)

      if (hovered === i) {
        scale = Math.max(scale, 1.12)
        opacity = 1
        zIndex = 200
      }

      const entranceRaw = (entranceRef.current * (count + 8) - i) / 5
      const entrance = Math.max(0, Math.min(1, entranceRaw))
      const eased = 1 - Math.pow(1 - entrance, 3)

      const finalOpacity = opacity * eased
      const entranceY = (1 - eased) * 50
      const finalScale = scale * (0.5 + 0.5 * eased)

      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y + entranceY}px) scale(${finalScale})`
      el.style.zIndex = String(zIndex)
      el.style.opacity = String(finalOpacity)
    }

    /* Hide leftover refs from previous filter */
    for (let i = count; i < itemEls.current.length; i++) {
      const el = itemEls.current[i]
      if (el) el.style.opacity = "0"
    }
  })

  return (
    <div ref={sentinelRef}>
      <div
        ref={sceneRef}
        className="relative mx-auto h-[280px] w-full max-w-5xl sm:h-[340px]"
      >
        {/* Dashed orbit ellipse */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
          width="600"
          height="160"
          viewBox="0 0 600 160"
        >
          <ellipse
            cx="300"
            cy="80"
            rx="290"
            ry="55"
            fill="none"
            className="stroke-primary"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
        </svg>

        {/* Skill items */}
        {items.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => {
              itemEls.current[i] = el
            }}
            className="absolute left-1/2 top-1/2 cursor-pointer"
            style={{ opacity: 0, willChange: "transform, opacity" }}
            onMouseEnter={() => {
              isPausedRef.current = true
              hoveredRef.current = i
              setHoveredIndex(i)
            }}
            onMouseLeave={() => {
              isPausedRef.current = false
              hoveredRef.current = null
              setHoveredIndex(null)
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card/90 backdrop-blur-sm transition-all duration-300 sm:h-[72px] sm:w-[72px]"
                style={
                  hoveredIndex === i
                    ? {
                        borderColor: `${item.color}55`,
                        boxShadow: `0 0 32px 8px ${item.color}18, 0 4px 20px rgba(0,0,0,0.15)`,
                        transform: "translateY(-6px)",
                      }
                    : {}
                }
              >
                <div className="[&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-9 sm:[&_svg]:w-9">
                  {item.icon}
                </div>
              </div>
              <span
                className={`whitespace-nowrap text-[11px] font-medium transition-colors duration-300 ${
                  hoveredIndex === i
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Main section ---- */

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const filteredItems = getFilteredItems(activeFilter)

  return (
    <section id="competences" className="relative px-6 py-24 sm:py-32">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="font-mono text-sm text-primary">03</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Competences
          </h2>
          <p className="mb-8 max-w-xl leading-relaxed text-muted-foreground">
            {"Un eventail de technologies maitrisees, du front au back, en passant par les bases de donnees et le DevOps."}
          </p>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.15}>
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.key
                    ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_16px_hsl(var(--primary)/0.1)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <OrbitalCarousel key={activeFilter} items={filteredItems} />
      </div>
    </section>
  )
}
