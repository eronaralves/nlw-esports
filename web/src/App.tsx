import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'

// Styles
import './styles/main.css'

// Images
import LogoNlw from "./assets/logo-nlw-esports.svg"

// Components
import { GameBanner } from "./components/GameBanner"
import { CreateAdBanner } from "./components/CreateAdBanner"
import { CreateAdModal } from "./components/CreateAdModal"
import axios from "axios"



interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number
  }
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]) 

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(max-width: 1300px)": {
        slides: {
          perView: 4.5,
          spacing: 24
        }
      },
      "(max-width: 750px)": {
        slides: {
          perView: 2.5,
          spacing: 24
        }
      },
      "(max-width: 450px)": {
        slides: {
          perView: 1.5,
          spacing: 24
        }
      },
    },
    slides: {
      perView: 6,
      spacing: 24
    }
  })

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => setGames(response.data) )
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20 px-5'>
      <img src={LogoNlw} alt="Logo NLW eSports" />

      <h1 className='text-white font-black mt-20 lg:text-6xl  md:text-[40px] text-3xl'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div ref={ref} className='keen-slider  mt-16'>
        {games.map(item => (
          <GameBanner key={item.id} item={item}/> 
        ))}      
      </div>

      <Dialog.Root>
        <CreateAdBanner/>

        <CreateAdModal/>
      </Dialog.Root>  
    </div>
  )
}


