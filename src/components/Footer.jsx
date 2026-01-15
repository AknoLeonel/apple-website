import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div>
          {/* MUDANÇA 1: Slogan e Endereço */}
          <p className="font-semibold text-gray text-xs">
            Realizando sonhos desde 2022. {' '}
            <span className="underline text-blue cursor-pointer">
              Avenida Formosa 1876, Centro
            </span>
            {' '}.
          </p>
          {/* MUDANÇA 2: Marcas e Pagamento */}
          <p className="font-semibold text-gray text-xs">
            iPhone, Samsung, Realme e Xiaomi. Dividimos em até 12x no cartão.
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          {/* MUDANÇA 3: Copyright da Loja */}
          <p className="font-semibold text-gray text-xs">Copyright @ 2026 PS IPHONES. Todos os direitos reservados.</p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray text-xs">
                {link}{' '}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer