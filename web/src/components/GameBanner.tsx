
interface GameBanner {
  bannerUrl: string;
  title: string;
  _count: {
    ads: number
  }
    
}

interface PropsItem {
  item: GameBanner
}

export function GameBanner(props:PropsItem) {

  return (
    <a href="" className='relative rounded-lg overflow-hidden keen-slider__slide'>
      <img src={props.item.bannerUrl}/>
      
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className='text-white font-bold block '>{props.item.title}</strong>
        <span className='text-zinc-300 text-sm block'>{props.item._count.ads} anúcio(s)</span>
      </div>
    </a> 
  )
}