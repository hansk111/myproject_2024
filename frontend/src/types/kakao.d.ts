// src/types/kakao.d.ts
// declare namespace kakao {
//     namespace maps {
//         namespace services {
        
//             export interface Address {
//                 address_name?: string;
//                 region_1depth_name?: string;
//                 region_2depth_name?: string;
//                 region_3depth_name?: string;
//                 region_3depth_h_name?: string;
//                 mountain_yn?: string;
//                 main_address_no?: string;
//                 sub_address_no?: string;
//                 zip_code?: string;
//             }

//             export interface RoadAddress {
//                 address_name: string;
//                 region_1depth_name: string;
//                 region_2depth_name: string;
//                 region_3depth_name: string;
//                 road_name: string;
//                 underground_yn: string;
//                 main_building_no: string;
//                 sub_building_no: string;
//                 building_name: string;
//                 zone_no: string;
//             }

//             export interface Document {
//                 address?: Address;
//                 road_address?: RoadAddress;
//                 x: string;
//                 y: string;
//             }

//             export interface GeocoderResult {
//                 meta: {
//                 total_count: number;
//                 };
//                 documents: Document[];
//             }

//             export enum Status {
//                 OK = "OK",
//                 ZERO_RESULT = "ZERO_RESULT",
//                 ERROR = "ERROR",
//             }

//             export class Geocoder {
//                 coord2Address(
//                 x: number,
//                 y: number,
//                 callback: (
//                     result: GeocoderResult,
//                     status: Status
//                 ) => void,
//                 option?: { input_coord?: "WGS84" | "WCONGNAMUL" }
//                 ): void;
//             }
            
//             export class Services {
//                 constructor();
//                 Geocoder:typeof Geocoder;
//             }
//             }
//             export class LatLng{
//             constructor(lat: number, lng: number);
//             getLat():number;
//             getLng():number;
//             }
            
//     }

//     }
    