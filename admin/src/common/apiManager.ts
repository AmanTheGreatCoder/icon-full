import axios from "axios";
import config from "../../tailwind.config";

class ApiManager {
  private readonly baseURL = process.env.NEXT_PUBLIC_API_URL;
  private readonly axiosInstance;

  constructor() {
    let token;
    if (typeof window !== "undefined" && window.localStorage) {
      token = localStorage.getItem("token");
    }
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async get<T>(endpoint: string) {
    try {
      const response: any = await this.axiosInstance.get(endpoint);
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(endpoint: string, data: any, config: any) {
    try {
      const response: any = await this.axiosInstance.post(
        endpoint,
        data,
        config,
      );
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(endpoint: string, data: any) {
    try {
      const response: any = await this.axiosInstance.put(endpoint, data);
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(endpoint: string) {
    try {
      const response: any = await this.axiosInstance.delete(endpoint);
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(endpoint: string, data: any) {
    try {
      const response: any = await this.axiosInstance.patch(endpoint, data);
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    return error;
  }
}

export const apiManager = new ApiManager();
