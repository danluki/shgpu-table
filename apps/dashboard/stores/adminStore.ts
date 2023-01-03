import create from 'zustand'

interface AdminState {
  admin: AdminDto
}

const useAdminStore = create<>((store: Zust))