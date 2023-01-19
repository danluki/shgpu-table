// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";
// import { $axios } from "../api/axios";
// import { AddAdvertisingDto, AdvertisingDto } from "../dtos";
//
// interface AdvertisingsState {
//   advertisings: AdvertisingDto[];
//   selectedAdvertising: AdvertisingDto | null;
//   postAdvertising: (_: AddAdvertisingDto) => void;
//   patchAdvertising: (_: AdvertisingDto) => void;
//   deleteAdvertisings: (id: number) => void;
//   selectAdvertising: (id: number) => void;
//   fetchAdvertisings: () => void;
// }
//
// export const useAdvertisingsStore = create<AdvertisingsState>()(
//   devtools(
//     persist(
//       (set) => ({
//         advertisings: [],
//         selectedAdvertising: null,
//         fetchAdvertisings: async () => {
//           const { data } = await $axios({
//             method: "get",
//             url: "/v1/advertisings",
//           })
//           if (!data) return;
//
//           set({advertisings: data.advertisings})
//         },
//         postAdvertising: (advDto: AddAdvertisingDto) => {
//
//         },
//         patchAdvertising: (advDto: AdvertisingDto) => {},
//         deleteAdvertisings: async (id: number) => {
//           const response = await $axios({
//             method: "delete",
//             url: `/v1/advertisings/${id}`,
//           })
//         },
//         selectAdvertising: async (id: number) => {
//           const { data } = await $axios({
//             method: "get",
//             url: `/v1/advertisings/${id}`,
//           });
//           if (!data) return;
//
//           set({selectAdvertising: data.})
//         },
//       }),
//       {
//         name: "advertising-storage",
//       }
//     )
//   )
// );
