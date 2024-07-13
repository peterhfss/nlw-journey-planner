import { FormEvent, useState } from 'react';
import { InviteGuestsModal } from './invite-guests-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { ConfirmTripModal } from './confirm-trip-modal';
import { useNavigate } from 'react-router-dom';

export const CreateTripPage = () => {

  const navigate = useNavigate()

  const [ isGuestsInputOpen , setIsGuestsInputOpen ] = useState(false);
  const [ isGuestsModalOpen , setIsGuestsModalOpen ] = useState(false);
  const [ isConfirmTripModalOpen, setIsConfirmTripModalOpen ] = useState(false);
  const [ emailsToInvite, setEmailsToInvite ] = useState<string[]>([])
  const [ destination, setDestination ] = useState<string | undefined>();
  const [ dateTrip, setDateTrip ] = useState<string | undefined>()
  
  function openInputGuests(){
    setIsGuestsInputOpen(true)
    setDestination('Teste')
    setDateTrip('01/08/2024')
  }

  function closeInputGuests(){
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal(){
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal(){
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event:FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()
  

    if(!email){
      return alert('Informe o e-mail do convidado')
    }

    if(emailsToInvite.includes(email)){
      event.currentTarget.reset()
      return  alert('O e-mail informado já foi adicionado')
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvite(emailToRemove: string){
      const newEmailList = emailsToInvite.filter(email  => email != emailToRemove)
      setEmailsToInvite(newEmailList)
  }

  function createTrip(){
    navigate('/trips/123')
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        
        <div className='space-y-4'>
          <DestinationAndDateStep 
            isGuestsInputOpen={isGuestsInputOpen}
            closeInputGuests={closeInputGuests}
            openInputGuests={openInputGuests}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep 
              emailsToInvite={emailsToInvite}
              openGuestsModal={openGuestsModal}
              openConfirmTripModal= {openConfirmTripModal}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#"  className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>
      
      {isGuestsModalOpen && (
        <InviteGuestsModal 
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
          closeConfirmTripModal={closeConfirmTripModal}
          dateTrip={dateTrip}
          destination={destination}
          createTrip={createTrip}
        />
      )}
      
    </div>
  )
}