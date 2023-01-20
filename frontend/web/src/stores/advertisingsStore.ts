import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {$axios} from "../api/axios";
import {AddAdvertisingDto, AdvertisingDto} from "../dtos";

interface AdvertisingsState {
  advertisingsLoading: "loading" | "success" | "error",
  advertisings: AdvertisingDto[];
  selectedAdvertising: AdvertisingDto | null;
  postAdvertising: (_: AddAdvertisingDto) => void;
  patchAdvertising: (_: AdvertisingDto) => void;
  deleteAdvertisings: (id: number) => void;
  selectAdvertising: (id: number) => void;
  fetchAdvertisings: () => void;
}

export const useAdvertisingsStore = create<AdvertisingsState>()(
  devtools(
    persist(
      (set) => ({
        advertisingsLoading: "loading",
        advertisings: [],
        selectedAdvertising: null,
        fetchAdvertisings: async () => {
          set(() => ({advertisingsLoading: "loading"}))
          const {data} = await $axios({
            method: "get",
            url: "/v1/advertisings",
          })
          if (!data) {
            set(() => ({advertisingsLoading: "error"}))
          };

          set({advertisings: data.advertisings, advertisingsLoading: "success"})
        },
        postAdvertising: async (advDto: AddAdvertisingDto) => {
          await $axios({
            method: "post",
            url: "/v1/advertisings",
            data: {
              ...advDto,
              sendDate: advDto.sendDate.toISOString()
            }
          })
        },
        patchAdvertising: async (advDto: AdvertisingDto) => {
        },
        deleteAdvertisings: async (id: number) => {
          const response = await $axios({
            method: "delete",
            url: `/v1/advertisings/${id}`,
          })
        },
        selectAdvertising: async (id: number) => {
          const {data} = await $axios({
            method: "get",
            url: `/v1/advertisings/${id}`,
          });
          if (!data) return;

          set((state) => ({
            ...state,
            selectedAdvertising: state.advertisings.find(adv => adv.id === data.id)
          }))
        },
      }),
      {
        name: "advertising-storage",
      }
    )
  )
);
