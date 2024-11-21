import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Award, Bell, BookOpen, CheckSquare, ChevronLeft, ChevronRight, Clock, Code, LogOut, Menu, MessageSquare, Settings, User, Video, Bookmark, Home, GraduationCap } from 'lucide-react'

export default function StudentDashboard() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  const courses = [
    { name: "Web Development Fundamentals", progress: 75 },
    { name: "JavaScript Mastery", progress: 50 },
    { name: "React and Next.js", progress: 25 },
  ]

  const upcomingLessons = [
    { name: "Advanced CSS Techniques", date: "Today, 2:00 PM" },
    { name: "JavaScript Promises", date: "Tomorrow, 10:00 AM" },
    { name: "React Hooks Deep Dive", date: "May 15, 3:00 PM" },
  ]

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Left Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-gray-50 dark:bg-gray-800 transform transition-all duration-300 ease-in-out
          overflow-y-auto
          ${leftSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'}
          lg:translate-x-0 lg:w-64 lg:relative
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Code className="h-6 w-6 text-yellow-500" />
            <span className="ml-2 text-xl font-bold">CodeNexus</span>
          </div>
          {/* Remove this block */}
        </div>
        <nav className="mt-4 px-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3" />
                My Courses
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-3" />
                Learning Paths
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-3" />
                Messages
              </a>
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Account
            </h3>
            <div className="mt-2 space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center">
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#" className="flex items-center">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-red-100" asChild>
                <a href="#" className="flex items-center">
                  <LogOut className="h-5 w-5 mr-3" />
                  Log out
                </a>
              </Button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className="mr-4 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Ch_bhuvan</p>
                    <p className="text-xs leading-none text-muted-foreground">ch_bhuvan@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Welcome back, Ch_bhuvan!</h2>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              {/* Stats Cards */}
              <Card className="border-l-4 border-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+15% from last week</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assignments Completed</CardTitle>
                  <CheckSquare className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 this week</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                  <Award className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">Web Development Basics</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2">
              {/* Course Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  {courses.map((course, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{course.name}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="w-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingLessons.map((lesson, index) => (
                    <div key={index} className="mb-4 last:mb-0 p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-md transition-colors">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{lesson.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{lesson.date}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <aside
        className={`${
          rightSidebarOpen ? 'translate-x-0 w-64' : 'translate-x-full w-0'
        } fixed inset-y-0 right-0 z-50 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64 overflow-y-auto`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Quick Access</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightSidebarOpen(false)}
            className="lg:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <nav className="mt-4 px-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <BookOpen className="h-5 w-5 mr-3" />
              Enrolled Courses
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <Award className="h-5 w-5 mr-3" />
              Certificates
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <Bookmark className="h-5 w-5 mr-3" />
              Wishlist
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center">
              <Video className="h-5 w-5 mr-3" />
              Liked Videos
            </a>
          </Button>
        </nav>
      </aside>

      {/* Right Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
        className="fixed bottom-4 right-4 z-50 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 lg:hidden"
      >
        {rightSidebarOpen ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </Button>
    </div>
  )
}