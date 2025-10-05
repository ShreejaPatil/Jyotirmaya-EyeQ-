import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Booking() {
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleBooking = () => {
    if (date && timeSlot && specialty) {
      const booking = {
        date: date.toISOString(),
        timeSlot,
        specialty,
        hospital: 'Galaxy Hospital, Pune',
        timestamp: new Date().toISOString()
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.unshift(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      setIsBooked(true);
      setTimeout(() => {
        setLocation('/home');
      }, 2000);
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">
              Your appointment has been scheduled. You'll receive a confirmation message shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/home')}
            className="text-white hover:bg-blue-600"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Book Appointment</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Galaxy Hospital, Pune
            </CardTitle>
            <CardDescription>
              Choose your preferred date, time, and specialty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Specialty</label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ophthalmology">Ophthalmology (Eye)</SelectItem>
                  <SelectItem value="cataract">Cataract Surgery</SelectItem>
                  <SelectItem value="pediatric">Pediatric Eye Care</SelectItem>
                  <SelectItem value="general">General Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <div className="border rounded-lg p-3 bg-white">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Available Time Slots</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={timeSlot === slot ? "default" : "outline"}
                    onClick={() => setTimeSlot(slot)}
                    className={`h-10 text-sm ${timeSlot === slot ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-sm text-blue-800">
                A confirmation message and reminder will be sent to your registered contact.
              </AlertDescription>
            </Alert>

            <Button
              onClick={handleBooking}
              disabled={!date || !timeSlot || !specialty}
              className="w-full h-12 bg-green-500 hover:bg-green-600 text-lg disabled:opacity-50"
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Hospital Information</h4>
            <div className="space-y-1 text-sm text-yellow-800">
              <p>📍 Galaxy Hospital, Narhe, Pune</p>
              <p>📞 +91 20 1234 5678</p>
              <p>⏰ Mon-Sat: 9 AM - 6 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
