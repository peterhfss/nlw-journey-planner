import { Mail, User, X } from "lucide-react"
import { FormEvent } from "react";

interface ConfirmTripModalProps{
  closeConfirmTripModal : () => void;
  destination: string | undefined;
  dateTrip: string | undefined;
  createTrip : (event: FormEvent<HTMLFormElement>) => void;
}

export const ConfirmTripModal = ({closeConfirmTripModal , destination, dateTrip ,createTrip}: ConfirmTripModalProps) =>{

  return(
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
           <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>

              <button type='button'onClick={closeConfirmTripModal}>
                <X className='size-5 text-zinc-400' />
              </button>

            </div>

            <p  className='text-zinc-400 text-sm'>
              Para concluir a criação da viagem para {destination} nas datas de {dateTrip} preencha seus dados abaixo:
            </p>

        </div>

        <form  onClick={createTrip} className='space-y-3'>
          <div className='px-4 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center flex-1 gap-2'>
              <User className='size-5 text-zinc-400'/>
              <input  name='fullName' placeholder="Seu nome completo" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none disabled:text-zinc-500 flex-1" />
          </div>

          <div className='px-4 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center flex-1 gap-2'>
              <Mail className='size-5 text-zinc-400'/>
              <input type="email" name='email' placeholder="Seu e-mail pessoal" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none disabled:text-zinc-500 flex-1" />
          </div>
                
          <button type='submit' className='w-full bg-lime-300 justify-center text-lime-950 rounded-lg px-5 h-11 flex items-center gap-2 hover:bg-lime-400'>
            Confirmar criação da viagem
          </button>
        </form>

      </div>

    </div>
  )
}