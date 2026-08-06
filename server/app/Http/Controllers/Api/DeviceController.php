<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Device;

class DeviceController extends Controller
{
    // menampilkan semua device
    public function index(){
        $devices = Device::orderBy('id','desc')->get();

        return response()->json([
            'success'=> true,
            'message' => 'Daftar device berhasil diambil',
            'data' => $devices
        ], 200);
    }

    // menyimpan device baru.
    public function store(Request $request){
        $validated = $request->validate([
            'device_code' => 'required|string|max:50|unique:device,device_code',
            'device_name' => 'required|string|max:100',
            'location'    => 'required|string|max:100',
            'ip_address'  => 'nullable|ip',
            'status' => 'required|in:active,inactive',
        ]);

        $device = Device::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Device berhasil ditambahkan.',
            'data' => $device
        ], 201);
    }

    // menampilkan detail device berdasarkan ID
    public function show($id){
        $device = Device::find($id);

        if(!$device){
            return response()->json([
                'success' => false,
                'message' => 'Device tidak ditemukan.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $device
        ], 200);
    }

    // mengubah data device
    public function update(Request $request, $id){
        $device = Device::find($id);

        if(!$device){
            return response()->json([
                'success' => false,
                'message' => 'Device tidak ditemukan.'
            ], 404);
        }

        $validated = $request->validate([
            'device_code' => 'required|string|max:50|unique:device,device_code',
            'device_name' => 'required|string|max:100',
            'location'    => 'required|string|max:100',
            'ip_address'  => 'nullable|ip',
            'status' => 'required|in:active,inactive',
        ]);

        $device->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Device berhasil diperbarui.',
            'data' => $device
        ], 200);
    }

    // menghapus data device
    public function destroy($id){
        $device = Device::find($id);

        if(!$device){
            return response()->json([
                'success' => true,
                'message' => 'Device berhasil dihapus.'
            ], 200);
        }
    }
}