import { Request, Response } from 'express'
import { toNewUserEntry, toUpdateUserEntry, validateChangePassword, validateLoginData } from '../utils/req-body-user'
import { activeUser, changePassword, desactiveUser, getAllUsers, getAllUsersDesactivated, getOneUser, loginUser, registerUser, updateUser } from '../services/usersServices'

//! USERS ⬇
export const handleRegisterUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataValidated = toNewUserEntry(req.body)
    const user = await registerUser(dataValidated)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleLoginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const dataValidated = validateLoginData(req.body)
    const loginResponse = await loginUser(dataValidated)
    res.status(200).json(loginResponse)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleChangePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const dataValidated = validateChangePassword(req.body)
    const passwordChanged = await changePassword(userId, dataValidated)
    res.status(200).json(passwordChanged)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleGetOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const user = await getOneUser(userId)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id
    if (!userId) throw new Error('ID del usuario no proporcionado o inválido')
    const dataValidated = toUpdateUserEntry(req.body)
    const updatedUser = await updateUser(+req.params.id, dataValidated)
    res.status(201).json(updatedUser)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

//! ADMIN ⬇

export const handleGetAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleGetAllUsersDesactivated = async (_req: Request, res: Response): Promise<void> => {
  try {
    const usersDesactivated = await getAllUsersDesactivated()
    res.status(200).json(usersDesactivated)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleDesactiveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDesactive = await desactiveUser(+req.params.id)
    res.status(202).send(userDesactive)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}

export const handleActiveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userActive = await activeUser(+req.params.id)
    res.status(200).send(userActive)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
}
