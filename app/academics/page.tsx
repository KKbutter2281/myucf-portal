'use client'

import React from 'react'
import Link from 'next/link'
import { Book, GraduationCap, Calendar, FileText, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function AcademicsPage() {
  return (
    <div className="container max-w-6xl px-4 py-12">
      <div className="space-y-4 mb-12">
        <h1 className="text-5xl font-bold tracking-tight">Academics</h1>
        <p className="text-muted-foreground text-xl max-w-2xl">
          Manage your academic journey at UCF
        </p>
        <Separator className="my-8" />
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/academics/degree" className="block transform transition-all duration-200 hover:scale-[1.02]">
          <Card className="p-8 group hover:border-primary hover:shadow-lg">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Degree Progress</h2>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-lg">Track your degree requirements and academic progress</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/academics/schedule-gen" className="block transform transition-all duration-200 hover:scale-[1.02]">
          <Card className="p-8 group hover:border-primary hover:shadow-lg">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Schedule Generator</h2>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-lg">Plan your classes and create your schedule</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/academics/enrollment" className="block transform transition-all duration-200 hover:scale-[1.02]">
          <Card className="p-8 group hover:border-primary hover:shadow-lg">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Book className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Enrollment</h2>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-lg">View and manage course enrollment</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/academics/transcripts" className="block transform transition-all duration-200 hover:scale-[1.02]">
          <Card className="p-8 group hover:border-primary hover:shadow-lg">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Transcripts</h2>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-lg">Access and request official transcripts</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}