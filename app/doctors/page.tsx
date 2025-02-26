"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doctors } from '@/app/data';

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")
  const [minRating, setMinRating] = useState(0)
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)

  const handleFilter = () => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (specialty === "" || doctor.specialty === specialty) &&
        (location === "" || doctor.location === location) &&
        doctor.rating >= minRating,
    )
    setFilteredDoctors(filtered)
  }

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
    handleFilter()
  }

  const handleSpecialtyChange = (value) => {
    setSpecialty(value)
    handleFilter()
  }

  const handleLocationChange = (value) => {
    setLocation(value)
    handleFilter()
  }

  const handleMinRatingChange = (value) => {
    setMinRating(Number(value))
    handleFilter()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Input placeholder="Search doctors..." value={searchTerm} onChange={handleSearchTermChange} />
        <Select onValueChange={handleSpecialtyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="Plastic Surgery">Plastic Surgery</SelectItem>
            <SelectItem value="Dermatology">Dermatology</SelectItem>
            {/* Add more specialties */}
          </SelectContent>
        </Select>
        <Select onValueChange={handleLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Seoul">Seoul</SelectItem>
            <SelectItem value="Busan">Busan</SelectItem>
            {/* Add more locations */}
          </SelectContent>
        </Select>
        <Select onValueChange={handleMinRatingChange}>
          <SelectTrigger>
            <SelectValue placeholder="Minimum Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any Rating</SelectItem>
            <SelectItem value="3">3+ Stars</SelectItem>
            <SelectItem value="4">4+ Stars</SelectItem>
            <SelectItem value="4.5">4.5+ Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <Link href={`/doctors/${doctor.id}`} key={doctor.id} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg">
              <Image
                src={doctor.photo || "/placeholder.svg"}
                alt={doctor.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="flex items-center mb-2">
                  <MapPin className="text-gray-400 mr-1" size={16} />
                  <span className="text-gray-600">{doctor.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-1" size={16} />
                  <span>{doctor.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
