import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  company: string;
  time: string;
  date: string;
  type: 'interview' | 'meeting' | 'deadline';
}

interface Application {
  id: string;
  company: string;
  position: string;
  stage: '応募' | '一次面接' | '二次面接' | '最終面接' | '内定' | '不採用';
  date: string;
  status: 'pending' | 'scheduled' | 'completed' | 'rejected';
}

export function CalendarView() {
  const [viewMode, setViewMode] = useState<'calendar' | 'progress'>('calendar');
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('week');

  const events: Event[] = [
    { id: '1', title: '技術面接', company: 'TechCorp', time: '14:00', date: '2024-12-19', type: 'interview' },
    { id: '2', title: '人事面接', company: 'StartupX', time: '10:00', date: '2024-12-20', type: 'interview' },
    { id: '3', title: '履歴書改善', company: '自己啓発', time: '15:00', date: '2024-12-21', type: 'meeting' },
    { id: '4', title: '応募締切', company: 'BigCompany', time: '23:59', date: '2024-12-22', type: 'deadline' },
  ];

  const applications: Application[] = [
    { id: '1', company: 'TechCorp', position: 'フロントエンドエンジニア', stage: '二次面接', date: '2024-12-19', status: 'scheduled' },
    { id: '2', company: 'StartupX', position: 'フルスタック開発', stage: '一次面接', date: '2024-12-20', status: 'scheduled' },
    { id: '3', company: 'DataCo', position: 'フロントエンド開発', stage: '応募', date: '2024-12-15', status: 'pending' },
    { id: '4', company: 'CloudInc', position: 'React開発', stage: '最終面接', date: '2024-12-18', status: 'completed' },
    { id: '5', company: 'AILabs', position: 'フロントエンドエンジニア', stage: '内定', date: '2024-12-17', status: 'completed' },
    { id: '6', company: 'WebSolutions', position: 'シニアフロントエンド', stage: '不採用', date: '2024-12-16', status: 'rejected' },
  ];

  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];
  const currentWeek = ['16', '17', '18', '19', '20', '21', '22'];

  const getEventColor = (type: string) => {
    const colors = {
      interview: 'bg-blue-500',
      meeting: 'bg-green-500',
      deadline: 'bg-red-500'
    };
    return colors[type as keyof typeof colors];
  };

  const getStageColor = (stage: string) => {
    const colors = {
      '応募': 'default',
      '一次面接': 'secondary',
      '二次面接': 'default',
      '最終面接': 'secondary',
      '内定': 'default',
      '不採用': 'destructive'
    };
    return colors[stage as keyof typeof colors];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {viewMode === 'calendar' ? 'スケジュール' : '応募進捗'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
              <TabsList>
                <TabsTrigger value="calendar">カレンダー</TabsTrigger>
                <TabsTrigger value="progress">進捗</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'calendar' ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span>2024年12月 第3週</span>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Tabs value={calendarView} onValueChange={(v) => setCalendarView(v as any)}>
                <TabsList>
                  <TabsTrigger value="day">日</TabsTrigger>
                  <TabsTrigger value="week">週</TabsTrigger>
                  <TabsTrigger value="month">月</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* 週表示 */}
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, idx) => (
                <div key={day} className="border rounded-lg p-3 min-h-[180px]">
                  <div className="text-center mb-2">
                    <div className="text-sm text-muted-foreground">{day}</div>
                    <div className={`text-xl font-semibold ${idx === 3 ? 'text-primary' : ''}`}>
                      {currentWeek[idx]}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {events
                      .filter(e => e.date.endsWith(currentWeek[idx]))
                      .map(event => (
                        <div
                          key={event.id}
                          className="p-2 rounded bg-accent text-xs"
                        >
                          <div className={`w-1 h-1 rounded-full ${getEventColor(event.type)} inline-block mr-1`} />
                          <div>{event.time}</div>
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-muted-foreground truncate">{event.company}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* 応募進捗ビュー */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['応募', '一次面接', '二次面接', '最終面接', '内定', '不採用'].map(stage => (
                <div key={stage} className="flex-shrink-0 w-48">
                  <div className="bg-muted p-2 rounded-t-lg text-center">
                    <span>{stage}</span>
                    <Badge variant="outline" className="ml-2">
                      {applications.filter(app => app.stage === stage).length}
                    </Badge>
                  </div>
                  <div className="border border-t-0 rounded-b-lg p-2 space-y-2 min-h-[300px] bg-accent/20">
                    {applications
                      .filter(app => app.stage === stage)
                      .map(app => (
                        <div
                          key={app.id}
                          className="p-3 bg-card border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="font-medium text-sm mb-1">{app.company}</div>
                          <div className="text-xs text-muted-foreground mb-2">{app.position}</div>
                          <div className="text-xs text-muted-foreground">{app.date}</div>
                          <Badge variant={getStageColor(app.stage) as any} className="mt-2 text-xs">
                            {app.status === 'scheduled' ? '予定済' : 
                             app.status === 'pending' ? '保留中' : 
                             app.status === 'completed' ? '完了' : '不採用'}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}