import Link from 'next/link'

import { Facebook, Twitter, Linkedin, Github, Bitcoin, EclipseIcon as Ethereum } from 'lucide-react'
import { Button } from './ui/button'

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Crypto.io</h2>
            <p className="text-muted-foreground">Your go-to source for cryptocurrency news, analysis, and insights.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/crypto.io" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow us on Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/crypto_io" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow us on Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/company/crypto-io" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow us on LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/crypto-io" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Check our GitHub">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/advertise" className="hover:text-primary transition-colors">Advertise</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Topics</h3>
            <ul className="space-y-2">
              <li><Link href="/topic/bitcoin" className="hover:text-primary transition-colors flex items-center"><Bitcoin className="h-4 w-4 mr-2" /> Bitcoin</Link></li>
              <li><Link href="/topic/ethereum" className="hover:text-primary transition-colors flex items-center"><Ethereum className="h-4 w-4 mr-2" /> Ethereum</Link></li>
              <li><Link href="/topic/defi" className="hover:text-primary transition-colors">DeFi</Link></li>
              <li><Link href="/topic/nfts" className="hover:text-primary transition-colors">NFTs</Link></li>
              <li><Link href="/topic/blockchain" className="hover:text-primary transition-colors">Blockchain</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get the latest crypto news and analysis delivered straight to your inbox.</p>
            <Link href="/newsletter">
              <Button className="w-full">
                Subscribe to Our Newsletter
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Crypto.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

