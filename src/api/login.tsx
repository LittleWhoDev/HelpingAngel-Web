import { LoginDTO, RegisterDTO, SuccessDTO } from '@/dtos/login';
import Axios, { AxiosResponse } from 'axios';
import { baseUrl } from './config';

export function login(formData: LoginDTO): Promise<AxiosResponse<SuccessDTO>> {
  return Axios.post<LoginDTO, AxiosResponse<SuccessDTO>>(
    `${baseUrl}/login`,
    formData,
  );
}

export async function register(formData: RegisterDTO): Promise<void> {
  await Axios.post<RegisterDTO>(`${baseUrl}/register`, formData);
}
