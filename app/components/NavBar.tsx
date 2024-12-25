import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

const NavBar = () => {
  return (
    <div>
<nav className='w-full relative flex items-center justify-between max-w-6xl mx-auto px-4 py-5'>
<Link href='/' className='text-3xl md:text-5xl font-bold'>Crypto.<span className='text-primary'>io</span></Link>
<ModeToggle/>
</nav>
    </div>
  )
}

export default NavBar
