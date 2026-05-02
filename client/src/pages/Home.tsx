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
import { teams, type Team, HERO_BANNER, leagueStats } from '@/data/teams';
import { Trophy, Map, ArrowLeft } from 'lucide-react';
import { projectLogo } from '@/data/feature-data';
import { routePath, assetPath } from '@/lib/sitePaths';
import { useIsMobile } from '@/hooks/useMobile';

type LifeLayerKey = 'team' | 'stadium' | 'food' | 'hotel' | 'parking' | 'cuisine';

const LIFE_LAYER_OPTIONS: { key: LifeLayerKey; label: string }[] = [
  { key: 'team', label: '球队' },
  { key: 'stadium', label: '场馆' },
  { key: 'food', label: '餐饮' },
  { key: 'hotel', label: '住宿' },
  { key: 'parking', label: '停车' },
  { key: 'cuisine', label: '湘菜' },
];

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [show3D, setShow3D] = useState(false);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [mobileHubOpen, setMobileHubOpen] = useState(false);
  const [mobileLifePanelOpen, setMobileLifePanelOpen] = useState(false);
  const [activeLifeLayer, setActiveLifeLayer] = useState<LifeLayerKey>('team');
  const isMobile = useIsMobile();
  const defaultMobileTeam = teams.find((team) => team.id === 'changsha') ?? teams[0];
  const mobileDisplayTeam = selectedTeam ?? defaultMobileTeam;

  const handleTeamSelect = useCallback((team: Team | null) => {
    if (team === null) {
      setSelectedTeam(null);
      setShow3D(false);
      setMobilePanelOpen(false);
      setMobileLifePanelOpen(false);
      setMobileHubOpen(false);
      return;
    }

    const isSameTeam = selectedTeam?.id === team.id;
    setSelectedTeam(isSameTeam ? null : team);
    if (isMobile) {
      setMobilePanelOpen(!isSameTeam);
      setMobileLifePanelOpen(false);
      setMobileHubOpen(false);
    }
  }, [isMobile, selectedTeam]);

  const handleCloseDetail = useCallback(() => {
    setSelectedTeam(null);
    setShow3D(false);
    setMobilePanelOpen(false);
    setMobileLifePanelOpen(false);
    setMobileHubOpen(false);
  }, []);

  const handleToggleMobileHub = useCallback(() => {
    setMobileHubOpen((prev) => !prev);
  }, []);

  const handleOpenMobilePanel = useCallback(() => {
    if (!selectedTeam) {
      setSelectedTeam(defaultMobileTeam);
    }
    setMobilePanelOpen(true);
    setMobileLifePanelOpen(false);
    setMobileHubOpen(false);
  }, [defaultMobileTeam, selectedTeam]);

  const handleOpenMobileLifePanel = useCallback(() => {
    if (!selectedTeam) {
      setSelectedTeam(defaultMobileTeam);
    }
    setActiveLifeLayer('team');
    setMobilePanelOpen(false);
    setMobileLifePanelOpen(true);
    setMobileHubOpen(false);
  }, [defaultMobileTeam, selectedTeam]);

  const handleCloseMobilePanel = useCallback(() => {
    setMobilePanelOpen(false);
  }, []);

  const handleCloseMobileLifePanel = useCallback(() => {
    setMobileLifePanelOpen(false);
  }, []);

  const handleToggle3D = useCallback(() => {
    setShow3D((prev) => !prev);
  }, []);

  const handleResetView = useCallback(() => {
    setShow3D(false);
    setSelectedTeam(null);
    setMobilePanelOpen(false);
    setMobileLifePanelOpen(false);
    setMobileHubOpen(false);
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

          {/* Mobile: Xiangchao ball hub with match/life quick actions */}
          <div className="lg:hidden absolute left-3 top-3 z-[1180]">
            <button
              onClick={handleToggleMobileHub}
              className={`relative h-14 w-14 rounded-full border-2 border-white/90 bg-white/95 shadow-[0_14px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl flex items-center justify-center active:scale-95 transition-transform touch-manipulation ${mobileHubOpen ? 'scale-105' : ''}`}
              aria-label="打开湘超地图快捷菜单"
              title="湘超地图快捷菜单"
              style={{ boxShadow: `0 14px 30px ${(selectedTeam?.color ?? '#D32F2F')}2F` }}
            >
              <span className="absolute inset-1 rounded-full bg-gradient-to-br from-[#FF4D4F] via-[#D32F2F] to-[#8B0000] opacity-95" />
              <span className="absolute inset-[6px] rounded-full border border-white/35" />
              <img src={projectLogo} alt="湘超" className="relative z-10 h-8 w-8 object-contain drop-shadow" />
              <span
                className="absolute -right-1 -bottom-1 h-5 min-w-5 rounded-full border border-white bg-white px-1 text-[9px] font-black leading-5 text-[#D32F2F]"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                球
              </span>
            </button>

            <AnimatePresence>
              {mobileHubOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.82, y: -8 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                  className="absolute left-[3px] top-16 flex flex-col gap-2"
                >
                  <button
                    onClick={handleOpenMobilePanel}
                    className="h-12 w-12 rounded-full border-2 border-white bg-[#D32F2F] text-[12px] font-black text-white shadow-[0_10px_24px_rgba(211,47,47,0.28)] active:scale-95 touch-manipulation"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                    aria-label="打开赛事数据"
                  >
                    赛事
                  </button>
                  <button
                    onClick={handleOpenMobileLifePanel}
                    className="h-12 w-12 rounded-full border-2 border-white bg-emerald-500 text-[12px] font-black text-white shadow-[0_10px_24px_rgba(16,185,129,0.28)] active:scale-95 touch-manipulation"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                    aria-label="打开生活服务图层"
                  >
                    生活
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isMobile && mobilePanelOpen && selectedTeam && (
              <>
                <motion.button
                  key="mobile-detail-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseMobilePanel}
                  className="fixed inset-0 z-[1190] bg-black/30 backdrop-blur-[1px] lg:hidden"
                  aria-label="关闭球队详情侧栏遮罩"
                />
                <motion.div
                  key="mobile-detail-panel"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                  className="fixed right-0 top-0 bottom-0 z-[1200] w-[min(92vw,420px)] max-w-[420px] lg:hidden"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-l-[28px] shadow-[-20px_0_45px_rgba(15,23,42,0.22)]">
                    <TeamDetail team={selectedTeam} onClose={handleCloseMobilePanel} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isMobile && mobileLifePanelOpen && (
              <>
                <motion.button
                  key="mobile-life-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseMobileLifePanel}
                  className="fixed inset-0 z-[1190] bg-white/15 backdrop-blur-[2px] lg:hidden"
                  aria-label="关闭生活服务图层遮罩"
                />
                <motion.div
                  key="mobile-life-panel"
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.96 }}
                  transition={{ type: 'spring', damping: 24, stiffness: 230 }}
                  className="fixed inset-x-3 top-[82px] bottom-5 z-[1200] lg:hidden"
                >
                  <MobileLifeServicePanel
                    team={mobileDisplayTeam}
                    activeLayer={activeLifeLayer}
                    onLayerChange={setActiveLifeLayer}
                    onClose={handleCloseMobileLifePanel}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
          
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

function getLifeLayerCopy(layer: LifeLayerKey, team: Team) {
  const cityName = team.city.replace('市', '');

  switch (layer) {
    case 'stadium':
      return {
        category: '场馆',
        title: team.stadium,
        highlight: '主场观赛动线担当',
        description: `围绕${team.stadium}聚合入场口、看台区、安检口和赛后疏散建议，帮助球迷快速找到观赛路径。`,
      };
    case 'food':
      return {
        category: '餐饮',
        title: `${cityName}赛前补给`,
        highlight: '场馆周边餐饮推荐',
        description: `展示主场周边适合赛前聚餐与赛后宵夜的餐饮点位，优先突出步行可达和本地热门商圈。`,
      };
    case 'hotel':
      return {
        category: '住宿',
        title: `${cityName}观赛住宿`,
        highlight: '客队球迷友好住处',
        description: `聚合靠近球场、交通节点和城市核心区的住宿信息，方便外地球迷规划一晚或周末观赛行程。`,
      };
    case 'parking':
      return {
        category: '停车',
        title: `${team.stadium}停车指南`,
        highlight: '赛时交通疏导辅助',
        description: `展示球场周边停车场、临停区和换乘点，配合地图缩放可快速判断自驾与公共交通方案。`,
      };
    case 'cuisine':
      return {
        category: '湘菜',
        title: `${cityName}地道湘味`,
        highlight: '城市文旅味觉名片',
        description: `把本地代表湘菜、夜市和特色小吃纳入生活图层，让球迷在观赛之外继续探索城市烟火气。`,
      };
    case 'team':
    default:
      return {
        category: '球队',
        title: team.fullName,
        highlight: `${team.rankLabel}主场热度担当`,
        description: `球队以速度与压迫感见长，主场话题度和球迷黏性都很高。当前积分${team.stats.points}分，进失球为${team.stats.goalsFor}/${team.stats.goalsAgainst}。`,
      };
  }
}

function MobileLifeServicePanel({
  team,
  activeLayer,
  onLayerChange,
  onClose,
}: {
  team: Team;
  activeLayer: LifeLayerKey;
  onLayerChange: (layer: LifeLayerKey) => void;
  onClose: () => void;
}) {
  const layerCopy = getLifeLayerCopy(activeLayer, team);

  return (
    <div className="h-full overflow-y-auto rounded-[30px] border border-white/80 bg-white/96 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.20)] backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium tracking-[0.12em] text-[oklch(0.46_0.02_260)]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            {team.name}示例
          </p>
          <h2 className="mt-2 text-[26px] font-black leading-tight text-[oklch(0.16_0.02_260)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {team.name}服务图层示例
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-[#D32F2F]/8 px-3 py-1.5 text-xs font-black text-[#D32F2F]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            已集成到地图
          </span>
          <button
            onClick={onClose}
            className="h-11 w-11 rounded-full border border-[oklch(0.88_0.005_260)] bg-white text-2xl font-light leading-none text-[oklch(0.30_0.02_260)] shadow-sm active:scale-95"
            aria-label="关闭生活服务图层"
          >
            ‹
          </button>
        </div>
      </div>

      <p className="mt-5 text-[16px] font-medium leading-8 text-[oklch(0.36_0.02_260)]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
        这里先以{team.name}做交互样例。切换图层后，地图会自动聚焦{team.stadium}周边，并通过点位弹窗展示球队、场馆和周边服务信息。拖动、缩放或点击地图时，图例会自动收起，减少对地图视野的遮挡。
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {LIFE_LAYER_OPTIONS.map((option) => {
          const isActive = option.key === activeLayer;
          return (
            <button
              key={option.key}
              onClick={() => onLayerChange(option.key)}
              className={`rounded-full border px-5 py-3 text-base font-black transition-all active:scale-95 ${
                isActive
                  ? 'border-transparent bg-[#FF4D4F] text-white shadow-[0_10px_24px_rgba(255,77,79,0.26)]'
                  : 'border-[oklch(0.88_0.005_260)] bg-white text-[oklch(0.24_0.02_260)] shadow-sm'
              }`}
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-[28px] border border-[oklch(0.88_0.005_260)] bg-[oklch(0.985_0.002_260)] p-5 shadow-inner">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-[oklch(0.56_0.02_260)]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              {layerCopy.category}
            </p>
            <h3 className="mt-3 text-[24px] font-black leading-snug text-[oklch(0.16_0.02_260)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {layerCopy.title}
            </h3>
            <p className="mt-3 text-base font-black text-[#D32F2F]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              {layerCopy.highlight}
            </p>
          </div>
          <div
            className="h-20 w-20 shrink-0 rounded-[22px] shadow-lg"
            style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}B8)` }}
          />
        </div>

        <p className="mt-5 text-[17px] font-medium leading-8 text-[oklch(0.34_0.02_260)]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
          {layerCopy.description}
        </p>

        <div className="mt-6 rounded-[22px] bg-white p-4 shadow-[0_16px_42px_rgba(15,23,42,0.07)]">
          <p className="text-[15px] font-medium leading-8 text-[oklch(0.34_0.02_260)]" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            交互方式：点击图层按钮切换点位；点击地图地标打开弹窗；球队与场馆层可联动右侧赛事详情面板，服务层则聚焦商家简介与观赛动线。
          </p>
        </div>
      </div>
    </div>
  );
}
