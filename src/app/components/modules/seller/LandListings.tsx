import { useState } from 'react';
import { Shield, LogOut, Bot, MapPin, Search, Filter, ChevronLeft, Star, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { User } from '../../../App';
import { ImageWithFallback } from '../../lib/ImageWithFallback';

interface LandListingsProps {
  user: User;
  onLogout: () => void;
  onViewLand: (landId: string) => void;
  onBack: () => void;
  onToggleAI: () => void;
}

const mockLands = [
  {
    id: '1',
    title: '5.2 Acres Agricultural Land',
    location: 'Fresno County, California',
    price: 125000,
    area: 5.2,
    type: 'Agricultural',
    status: 'verified',
    aiScore: 95,
    riskLevel: 'low',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop'
    ],
    features: ['Water Access', 'Road Frontage', 'Fertile Soil'],
    listedDate: '2 days ago'
  },
  {
    id: '2',
    title: '2.8 Acres Residential Plot',
    location: 'Austin, Texas',
    price: 89500,
    area: 2.8,
    type: 'Residential',
    status: 'in-review',
    aiScore: 88,
    riskLevel: 'low',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=80'
    ],
    features: ['City Utilities', 'Zoned Residential', 'Near Schools'],
    listedDate: '1 week ago'
  },
  {
    id: '3',
    title: '10 Acres Commercial Land',
    location: 'Miami, Florida',
    price: 450000,
    area: 10,
    type: 'Commercial',
    status: 'verified',
    aiScore: 92,
    riskLevel: 'medium',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80'
    ],
    features: ['Highway Access', 'High Traffic', 'Development Ready'],
    listedDate: '3 days ago'
  },
  {
    id: '4',
    title: '15 Acres Forest Land',
    location: 'Oregon Coast',
    price: 210000,
    area: 15,
    type: 'Recreational',
    status: 'verified',
    aiScore: 90,
    riskLevel: 'low',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80'
    ],
    features: ['Creek', 'Timber Rights', 'Wildlife'],
    listedDate: '1 day ago'
  },
  {
    id: '5',
    title: '3.5 Acres Mixed Use',
    location: 'Phoenix, Arizona',
    price: 175000,
    area: 3.5,
    type: 'Mixed Use',
    status: 'verified',
    aiScore: 87,
    riskLevel: 'low',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80'
    ],
    features: ['Mountain Views', 'Flat Terrain', 'Solar Potential'],
    listedDate: '5 days ago'
  },
  {
    id: '6',
    title: '8 Acres Industrial Land',
    location: 'Chicago, Illinois',
    price: 320000,
    area: 8,
    type: 'Industrial',
    status: 'in-review',
    aiScore: 85,
    riskLevel: 'medium',
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80'
    ],
    features: ['Rail Access', 'Warehouse Zoning', 'Level Ground'],
    listedDate: '4 days ago'
  }
];

export function LandListings({ user, onLogout, onViewLand, onBack, onToggleAI }: LandListingsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    area: '',
    type: 'Agricultural',
    features: '',
    image: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Add new listing to mock data (in a real app, this would be an API call)
    const newListing = {
      id: (mockLands.length + 1).toString(),
      title: formData.title,
      location: formData.location,
      price: parseInt(formData.price),
      area: parseFloat(formData.area),
      type: formData.type,
      status: 'in-review',
      aiScore: 0,
      riskLevel: 'low',
      images: formData.image ? [formData.image] : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'],
      features: formData.features.split(',').map(f => f.trim()),
      listedDate: 'Just now'
    };
    mockLands.unshift(newListing);
    setIsDialogOpen(false);
    setFormData({
      title: '',
      location: '',
      price: '',
      area: '',
      type: 'Agricultural',
      features: '',
      image: ''
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      
      {/* Background Glows (Matching Sidebar) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Add Action */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {user.role === 'buyer' ? 'Browse Verified Lands' : 'My Land Listings'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {mockLands.length} verified properties with AI-powered insights
            </p>
          </div>

          {user.role !== 'buyer' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white">
                <DialogHeader>
                  <DialogTitle>Add New Land Listing</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right text-gray-600 dark:text-gray-300">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                      placeholder="e.g., 5 Acres Agricultural Land"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right text-gray-600 dark:text-gray-300">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                      placeholder="e.g., Fresno County, California"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right text-gray-600 dark:text-gray-300">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                      placeholder="125000"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="area" className="text-right text-gray-600 dark:text-gray-300">Area (acres)</Label>
                    <Input
                      id="area"
                      type="number"
                      step="0.1"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                      placeholder="5.2"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right text-gray-600 dark:text-gray-300">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                        <SelectItem value="Agricultural">Agricultural</SelectItem>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Recreational">Recreational</SelectItem>
                        <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="features" className="text-right text-gray-600 dark:text-gray-300">Features</Label>
                    <Textarea
                      id="features"
                      value={formData.features}
                      onChange={(e) => handleInputChange('features', e.target.value)}
                      className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                      placeholder="Water Access, Road Frontage..."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right text-gray-600 dark:text-gray-300">Images</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="col-span-3 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                      placeholder="Image URL"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="dark:bg-slate-800 dark:text-white dark:border-gray-700 dark:hover:bg-slate-700">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Add Listing
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-blue-500" />
              <Input 
                placeholder="Search by location or type..." 
                className="pl-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-blue-500"
              />
            </div>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-100k">Under $100k</SelectItem>
              <SelectItem value="100k-250k">$100k - $250k</SelectItem>
              <SelectItem value="250k+">$250k+</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLands.map((land) => (
            <Card 
              key={land.id} 
              className="
                group overflow-hidden cursor-pointer 
                bg-white/80 dark:bg-slate-900/80 backdrop-blur-md 
                border border-white/20 dark:border-white/10
                shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
              "
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={land.images[0]}
                  alt={land.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={land.status === 'verified' ? 'default' : 'secondary'}
                    className={`backdrop-blur-md shadow-lg ${land.status === 'verified' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}
                  >
                    {land.status === 'verified' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {land.status === 'verified' ? 'Verified' : 'In Review'}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600/90 backdrop-blur-md text-white shadow-lg">
                    AI Score: {land.aiScore}%
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-blue-500 transition-colors">
                      {land.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {land.location}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-500 -mt-1 -mr-2">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Badge variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {land.type}
                  </Badge>
                  <Badge variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {land.area} acres
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`${
                      land.riskLevel === 'low' 
                        ? 'text-green-600 border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20' 
                        : 'text-orange-600 border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20'
                    }`}
                  >
                    {land.riskLevel === 'low' ? 'Low Risk' : 'Medium Risk'}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {land.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-[10px] uppercase font-semibold tracking-wider bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${land.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Listed {land.listedDate}</div>
                  </div>
                  <Button 
                    onClick={() => onViewLand(land.id)}
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-slate-800">
            Load More Listings
          </Button>
        </div>
      </div>
    </div>
  );
}