/**
 * Home - 湘超数字地图看板主页（移动端适配版）
 * Mobile adaptations:
 * - Header simplified on mobile (smaller text, compact layout)
 * - Bottom team selector with larger touch targets & snap scroll
 * - TeamDetail uses bottom drawer on mobile via useIsMobile hook
 * - Map controls repositioned for thumb reach
 * - Stats bar simplified
 */

import { useState, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import HunanMap from '@/components/HunanMap';
import TeamList from '@/components/TeamList';
import TeamDetail from '@/components/TeamDetail';
import StatsBar from '@/components/StatsBar';
import LogoBadge from '@/components/LogoBadge';
import { teams, type Team, HERO_BANNER, leagueStats } from '@/data/teams';
import { Trophy, Map, ArrowLeft } from 'lucide-react';
import { projectLogo } from '@/data/feature-data';
import { routePath, assetPath } from '@/lib/sitePaths';
import { useIsMobile } from '@/hooks/useMobile';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [show3D, setShow3D] = useState(false);
  const isMobile = useIsMobile();

  const handleTeamSelect = useCallback((team: Team | null) => {
    if (team === null) {
      setSelectedTeam(null);
      setShow3D(false);
    } else {
      setSelectedTeam((prev) => (prev?.id === team.id ? null : team));
    }
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedTeam(null);
    setShow3D(false);
  }, []);

  const handleToggle3D = useCallback(() => {
    setShow3D((prev) => !prev);
  }, []);

  const handleResetView = useCallback(() => {
    setShow3D(false);
    setSelectedTeam(null);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[oklch(0.96_0.005_220)] flex flex-col">
      {/* Top Header Bar - Red gradient */}
      <header className="relative z-10 shrink-0">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #C62828 0%, #D32F2F 30%, #E53935 60%, #B71C1C 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url(${HERO_BANNER})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
              mixBlendMode: 'overlay',
            }}
          />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          }} />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${assetPath('assets/header-football-bg.png')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
        </div>
        
        <div className="relative px-3 py-2 sm:px-5 sm:py-3.5 flex items-center justify-between">
          {/* Left: Title */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href={routePath('/')}>
              <motion.div
                whileHover={{ x: -3 }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
              </motion.div>
            </Link>

            {/* Logo - hidden on mobile */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, delay: 0.1 }}
              className="relative hidden sm:block"
            >
              <div className="w-11 h-11 rounded-sm flex items-center justify-center relative"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                }}
              >
                <img src={projectLogo} alt="湘超 LOGO" className="w-7 h-7 object-contain" />
                <div className="absolute inset-[3px] border border-white/10 rounded-[1px]" />
              </div>
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-[1.5px] border-l-[1.5px] border-white/30" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-[1.5px] border-r-[1.5px] border-white/30" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-[1.5px] border-l-[1.5px] border-white/30" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-[1.5px] border-r-[1.5px] border-white/30" />
            </motion.div>

            <div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1"
              >
                <span
                  className="text-[15px] sm:text-[22px] font-black text-white tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif", textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}
                >
                  湘超
                </span>
                <span className="text-[15px] sm:text-[22px] font-light text-white/40 mx-0.5">·</span>
                <span
                  className="text-[15px] sm:text-[22px] font-black text-white/95 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif", textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}
                >
                  数字地图
                </span>
              </motion.h1>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden sm:flex items-center gap-2.5 mt-0.5"
              >
                <span className="text-[10px] text-white/50 tracking-[0.15em]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  2026 湘超联赛
                </span>
                <div className="w-px h-3 bg-white/20" />
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white/10 border border-white/15">
                  <Trophy className="w-2.5 h-2.5 text-amber-300" />
                  <span className="text-[9px] text-amber-200 font-bold tracking-wider">{leagueStats.champion}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Desktop nav */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href={routePath('/interactive')}>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/88 backdrop-blur-md transition hover:bg-white/15">
                互动中心
              </div>
            </Link>
            <Link href={routePath('/h5')}>
              <div className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/88 backdrop-blur-md transition hover:bg-black/30">
                H5
              </div>
            </Link>
            <div className="hidden xl:block">
              <StatsBar />
            </div>
          </div>

          {/* Mobile: Quick nav */}
          <div className="flex lg:hidden items-center gap-1.5">
            <Link href={routePath('/interactive')}>
              <div className="rounded-full bg-white/10 border border-white/15 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm">
                互动
              </div>
            </Link>
            <Link href={routePath('/h5')}>
              <div className="rounded-full bg-white/10 border border-white/15 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-sm">
                H5
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Team List - desktop only */}
        <AnimatePresence>
          {!show3D && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
              className="w-[260px] shrink-0 border-r border-[oklch(0.90_0.005_260)] bg-white hidden lg:block"
            >
              <TeamList selectedTeam={selectedTeam} onTeamSelect={handleTeamSelect} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center: Map */}
        <div className="flex-1 relative">
          <HunanMap
            onTeamSelect={handleTeamSelect}
            selectedTeam={selectedTeam}
            show3D={show3D}
            onToggle3D={handleToggle3D}
            onResetView={handleResetView}
          />
          
          {/* Floating info - desktop only */}
          <AnimatePresence>
            {!selectedTeam && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[600] hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/90 backdrop-blur-md border border-[oklch(0.90_0.005_260)] shadow-lg shadow-black/5"
              >
                <Map className="w-3.5 h-3.5 text-[#D32F2F]/60" />
                <span className="text-xs text-[oklch(0.45_0.02_260)]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  点击地图标记或左侧列表查看队伍详情
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mobile: Bottom team selector with improved touch targets */}
          <div className="lg:hidden absolute bottom-3 left-2 right-2 z-[600]">
            {!selectedTeam && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2 text-center"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[oklch(0.90_0.005_260)] shadow-sm text-[11px] text-[oklch(0.45_0.02_260)]">
                  <Map className="w-3 h-3 text-[#D32F2F]/60" />
                  点击标记或下方按钮查看详情
                </span>
              </motion.div>
            )}
            <div className="flex gap-1.5 overflow-x-auto pb-2 px-0.5 snap-x snap-mandatory scrollbar-hide">
              {teams.map((team) => {
                const isActive = selectedTeam?.id === team.id;
                return (
                  <button
                    key={team.id}
                    onClick={() => handleTeamSelect(team)}
                    className={`shrink-0 px-3 py-2 rounded-full text-xs font-bold transition-all border snap-start touch-manipulation ${
                      isActive
                        ? 'text-white shadow-lg border-transparent scale-105'
                        : 'bg-white/90 text-[oklch(0.40_0.02_260)] backdrop-blur-sm border-[oklch(0.88_0.005_260)] shadow-sm active:scale-95'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: team.color, boxShadow: `0 4px 12px ${team.color}40` }
                        : {}
                    }
                  >
                    {team.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: Team Detail Panel */}
          <div className="hidden lg:block">
            <TeamDetail team={selectedTeam} onClose={handleCloseDetail} />
          </div>

          {/* Mobile: Team Detail as Bottom Drawer */}
          {isMobile && (
            <Drawer open={!!selectedTeam} onOpenChange={(open) => { if (!open) handleCloseDetail(); }}>
              <DrawerContent className="max-h-[78vh]">
                <DrawerHeader className="sr-only">
                  <DrawerTitle>{selectedTeam?.name ?? ''} 详情</DrawerTitle>
                </DrawerHeader>
                {selectedTeam && (
                  <MobileTeamDetail team={selectedTeam} onClose={handleCloseDetail} />
                )}
              </DrawerContent>
            </Drawer>
          )}

          {/* Map control buttons */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[1100] flex items-center gap-2">
            <button
              onClick={handleResetView}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/90 hover:bg-white text-[oklch(0.35_0.02_260)] hover:text-[#D32F2F] px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border border-[oklch(0.88_0.005_260)] backdrop-blur-md shadow-md shadow-black/5 hover:shadow-lg hover:border-[#D32F2F]/20 group touch-manipulation"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="hidden sm:inline">全省总览</span>
              <span className="sm:hidden">总览</span>
            </button>
          </div>
        </div>
      </main>

      {/* Mobile stats bar - simplified */}
      <div className="lg:hidden shrink-0 border-t border-[oklch(0.90_0.005_260)] bg-white px-3 py-1.5 overflow-x-auto">
        <StatsBar />
      </div>
    </div>
  );
}

/** Mobile Team Detail - Compact card for bottom drawer */
function MobileTeamDetail({ team, onClose }: { team: Team; onClose: () => void }) {
  return (
    <div className="px-4 pb-6 pt-2 overflow-y-auto max-h-[68vh]">
      {/* Team header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}DD)` }}
        >
          <img
            src={assetPath(`assets/badges/${team.id}.jpg`)}
            alt={team.name}
            className="w-9 h-9 rounded-lg object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-black truncate" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {team.name}
          </h3>
          <p className="text-xs text-[oklch(0.50_0.02_260)]">{team.city} · {team.rankLabel}</p>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: team.color }}
        >
          #{team.rank}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-[oklch(0.97_0.005_260)] rounded-xl p-2.5 text-center">
          <div className="text-base font-black" style={{ color: team.color }}>{team.stats.points}</div>
          <div className="text-[10px] text-[oklch(0.50_0.02_260)]">积分</div>
        </div>
        <div className="bg-[oklch(0.97_0.005_260)] rounded-xl p-2.5 text-center">
          <div className="text-base font-black text-green-600">{team.stats.won}</div>
          <div className="text-[10px] text-[oklch(0.50_0.02_260)]">胜</div>
        </div>
        <div className="bg-[oklch(0.97_0.005_260)] rounded-xl p-2.5 text-center">
          <div className="text-base font-black text-amber-600">{team.stats.drawn}</div>
          <div className="text-[10px] text-[oklch(0.50_0.02_260)]">平</div>
        </div>
        <div className="bg-[oklch(0.97_0.005_260)] rounded-xl p-2.5 text-center">
          <div className="text-base font-black text-red-600">{team.stats.lost}</div>
          <div className="text-[10px] text-[oklch(0.50_0.02_260)]">负</div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[oklch(0.97_0.005_260)] rounded-xl p-3.5 mb-4">
        <p className="text-sm leading-6 text-[oklch(0.40_0.02_260)]">
          {team.description}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link href={routePath('/interactive')} className="flex-1">
          <div className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white touch-manipulation"
            style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}CC)` }}>
            查看完整数据
          </div>
        </Link>
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl text-sm font-medium bg-[oklch(0.95_0.005_260)] text-[oklch(0.40_0.02_260)] border border-[oklch(0.90_0.005_260)] touch-manipulation"
        >
          关闭
        </button>
      </div>
    </div>
  );
}
