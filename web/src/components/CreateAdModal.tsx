import * as  Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Selection from "@radix-ui/react-select"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import {styled} from "@stitches/react"

// Icons
import { CaretDown, Check, GameController } from "phosphor-react";

// Components
import { Input } from "./Form/input";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

const StyledContent = styled(Selection.Content, {
});

function Content(props: any) {
  return (
    <Selection.Portal>
      <StyledContent {...props}>{props.children}</StyledContent>
    </Selection.Portal>
  );
}
export const Select = Selection.Root
export const SelecContent = Content

export interface Game {
  id: string;
  title: string;
}


export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setuseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {setGames(response.data)})
  
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()
    
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    console.log(data)

    if(!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        weekDays: weekDays.map(Number),
        discord : data.discord,
        useVoiceChannel: useVoiceChannel,
        yearsPlaying: Number(data.yearsPlaying),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
      })

      alert('Anúncio criado com sucesso!')
    } catch(err) {
      console.log(err)
      alert('Erro ao criar o anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg sm:w-[480px] w-full shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
          
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4 ">
            
              <label htmlFor="game" className="font-semibold">Qual o game?</label>
              <Select name="game">
                <Selection.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-100 text-zinc-500 flex justify-between items-center ">
                  <Selection.SelectValue placeholder="Selecione o game para jogar"/>
                  <Selection.SelectIcon>
                    <CaretDown size={20}/>
                  </Selection.SelectIcon>
                </Selection.Trigger>

                <SelecContent >
                  <Selection.SelectViewport >
                    <Selection.SelectGroup >
                      {games.map(item => (
                        <Selection.SelectItem key={item.id} className="flex items-center gap-2 bg-zinc-900 text-zinc-100 py-3 px-4 cursor-default hover:bg-zinc-700" value={item.id}>
                          <Selection.SelectItemIndicator>
                            <Check size={14} className="text-green-500"/>
                          </Selection.SelectItemIndicator>
                          <Selection.SelectItemText>{item.title}</Selection.SelectItemText>
                        </Selection.SelectItem>
                      ))}
                    </Selection.SelectGroup>
                  </Selection.SelectViewport>
                </SelecContent>
              </Select>
          

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?"/>
            </div>

            <div className="sm:grid sm:grid-cols-2 gap-6 flex flex-wrap">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO"/>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input name="discord" id="discord" type="text" placeholder="Usuario#0000"/>
              </div>
            </div>

            <div className="flex gap-6 flex-wrap">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root 
                  type="multiple" 
                  className="grid grid-cols-4 gap-2"
                  value={weekDays}
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item value="0" title="Domingo" className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                  <ToggleGroup.Item value="1" title="Segunda" className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900 '}`}>S</ToggleGroup.Item>
                  <ToggleGroup.Item value="2" title="Terça" className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900 '}`}>T</ToggleGroup.Item>
                  <ToggleGroup.Item value="3" title="Quarta" className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900 '}`}>Q</ToggleGroup.Item>
                  <ToggleGroup.Item value="4" title="Quinta" className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900 '}`}>Q</ToggleGroup.Item>
                  <ToggleGroup.Item value="5"title="Sexta" className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900 '}`}>S</ToggleGroup.Item>
                  <ToggleGroup.Item value="6"title="Sábado" className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900 '}`}>S</ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De"/>
                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até"/>
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root 
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if(checked == true) {
                    setuseVoiceChannel(true)
                  } else {
                    setuseVoiceChannel(false)
                  }
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900">
                <Checkbox.Indicator >
                  <Check className="w-4 h-4 text-emerald-400"/>
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-center gap-4 flex-wrap sm:justify-end">
              <Dialog.Close 
                type="button"
                className="bg-zinc-500 px-5 sm:w-auto w-[190px] h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
              <button
                type="submit"
                className="bg-violet-500 px-5 sm:w-auto w-[190px]  h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                <GameController size={24}/>
                Encontrar duo
              </button>
            </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}