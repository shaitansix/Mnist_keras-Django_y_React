import { create } from 'zustand'

export const usePetition = create((set) => ({
  completed: true, 
  petitionInit: () => set({ completed: false }), 
  petitionFinish: () => set({ completed: true })
}))