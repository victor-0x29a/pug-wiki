import { Request, Response } from 'express'
import { walletBTC } from '../constants'

export const DefaultController = {
    home: (req: Request, res: Response) => {
        res.render("index")
    },
    help: (req: Request, res: Response) => {
        res.render("help", {
            walletbtc: walletBTC
        })
    }
}